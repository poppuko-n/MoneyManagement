class ProjectionGenerator
  def initialize(request_data)
    @request_data = request_data
  end

  def call
    company_map = Company.where(code: target_codes).index_by(&:code)
    price_groups = StockPrice.where(company_code: target_codes).group_by(&:company_code)
    target_codes.map { |code| build_projection_result(code, company_map, price_groups) }
  end

  private

  def build_projection_result(code, company_map, price_groups)
    company = company_map[code]
    prices = price_groups[code]
    quantity = quantity_for_code(code)

    {
      name: company.name,
      current_price: prices.max_by(&:date).close_price,
      quantity: quantity,
      one_time: OneTimeProjectionGenerator.new(quantity, prices).call,
      accumulated: AccumulatedProjectionGenerator.new(quantity, prices).call
    }
  end

  def quantity_for_code(code)
    @request_data.find { |d| d["code"] == code }["quantity"]
  end

  def target_codes
    @request_data.map { |d| d["code"] }
  end
end

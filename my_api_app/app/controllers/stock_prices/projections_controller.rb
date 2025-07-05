class StockPrices::ProjectionsController < ApplicationController
    def create
    company_map = Company.indexed_by_code(set_target_codes)
    price_groups = StockPrice.grouped_by_code(set_target_codes)

    render json: set_target_codes.map { |code| build_projection_result(code, company_map, price_groups) }
  end

  private

  def set_target_codes
    params[:data].map { |d| d[:code] }
  end

  # @param [Hash<String, Company>] company_map
  # @param [Hash<String, Array<StockPrice>>] price_groups
  def build_projection_result(code, company_map, price_groups)
    company = company_map[code]
    prices = price_groups[code]
    quantity = quantity_for_code(code)

    {
      name: company.name,
      current_price: prices.max_by(&:date)&.close_price,
      quantity: quantity,
      one_time: simulate_one_time(quantity, prices),
      accumulated: simulate_accumulated(quantity, prices)
    }
  end

  def quantity_for_code(code)
    params[:data].find { |d| d[:code] == code }[:quantity]
  end

  def simulate_one_time(quantity, prices)
    OneTimeSimulator.new(quantity, prices).call
  end

  def simulate_accumulated(quantity, prices)
    AccumulatedSimulator.new(quantity, prices).call
  end
end

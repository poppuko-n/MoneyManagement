class CompaniesController < ApplicationController

  def index
    companies = featch_companies
    result    = companies.map { |company| build_company_data(company)}
    render json: result
  end

  private

  def featch_companies
    Company.joins(:sector)
           .order(equity: :desc)
           .pluck(:code, :name, "sectors.name")
  end

  def build_company_data(company)
    code, name, sector_name = company
    latest_stock_price,  second_latest_stock_price = featch_latest_two_price(code)
    price_difference                               = calculate_price_difference(latest_stock_price, second_latest_stock_price)
    price_difference_rate                          = calculate_price_difference_rate(price_difference, latest_stock_price)

    {
      code: code,
      name: name,
      sector_name: sector_name,
      latest_price: latest_stock_price,
      price_difference: price_difference,
      price_difference_rate: price_difference_rate
    }
  end

  def featch_latest_two_price(code)
    StockPrice.where(company_code: code)
              .order(date: :desc)
              .limit(2)
              .pluck(:close_price)
  end

  def calculate_price_difference(latest_stock_price, second_latest_stock_price)
    latest_stock_price - second_latest_stock_price
  end

  def calculate_price_difference_rate(price_difference, latest_stock_price)
    (price_difference.to_f / latest_stock_price).round(2)
  end

end

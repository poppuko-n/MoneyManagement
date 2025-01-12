class CompaniesController < ApplicationController
  def index
    companies = Company
                  .joins(:sector)
                  .order(equity: :desc)
                  .pluck(:code, :name, 'sectors.name')


    result = companies.map do |code, name, sector_name|
      latest_stock_price,  second_latest_stock_price = StockPrice.latest_two_for_company(code) 
      price_difference = latest_stock_price - second_latest_stock_price
      price_difference_rate = latest_stock_price > 0 ? (price_difference.to_f / latest_stock_price).round(2) : 0

      {
        code: code,
        name: name,
        sector_name: sector_name,
        latest_price: latest_stock_price,
        price_difference: price_difference,
        price_difference_rate: price_difference_rate
      }
    end

    render json: result
  end
end

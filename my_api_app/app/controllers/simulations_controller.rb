class SimulationsController < ApplicationController
  def create
    data = params[:data]

    simulated_results = data.map do |item|
      company_code = item[:code]
      name = item[:name]
      current_price = item[:price]
      quantity = item[:quantity]

      # 最新の株価
      latest_price_data = StockPrice
                            .where(company_code: company_code)
                            .order(date: :desc)
                            .first

      latest_date = latest_price_data.date
      latest_price = latest_price_data.close_price

      # 指定期間の最古データ
      price_3_months_ago = StockPrice
                             .where(company_code: company_code, date: (latest_date - 3.months)..latest_date)
                             .order(date: :asc)
                             .first
      price_6_months_ago = StockPrice
                             .where(company_code: company_code, date: (latest_date - 6.months)..latest_date)
                             .order(date: :asc)
                             .first
      price_1_year_ago = StockPrice
                           .where(company_code: company_code, date: (latest_date - 1.year)..latest_date)
                           .order(date: :asc)
                           .first

      three_month_ago_rate = (latest_price - (price_3_months_ago&.close_price))/price_3_months_ago&.close_price.to_f.round(4)
      six_month_ago_rate =  (latest_price - (price_6_months_ago&.close_price))/price_6_months_ago&.close_price.to_f.round(4)
      one_year_ago_rate = (latest_price - (price_1_year_ago&.close_price))/price_1_year_ago&.close_price.to_f.round(4)

      simulation = {
        '3_months_ago' => (three_month_ago_rate * latest_price * quantity).round(0),
        '6_months_ago' => (six_month_ago_rate * latest_price * quantity).round(0),
        '1_year_ago' => (one_year_ago_rate * latest_price * quantity).round(0)
      }

      {
        code: company_code,
        name: name,
        current_price: current_price,
        quantity: quantity,
        simulation: simulation
      }
    end

    render json: { results: simulated_results }, status: :ok
  end
end

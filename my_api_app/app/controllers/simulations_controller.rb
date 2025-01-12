class SimulationsController < ApplicationController
  def create
    data = params[:data]

    simulated_results = data.map do |item|
      company_code  = item[:code]
      name          = item[:name]
      current_price = item[:price]
      quantity      = item[:quantity]

      latest_price_data = StockPrice
                            .where(company_code: company_code)
                            .order(date: :desc)
                            .first

      latest_date = latest_price_data.date
      latest_price = latest_price_data.close_price

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
        "3_months_ago" => (three_month_ago_rate * latest_price * quantity).round(0),
        "6_months_ago" => (six_month_ago_rate * latest_price * quantity).round(0),
        "1_year_ago" => (one_year_ago_rate * latest_price * quantity).round(0)
      }

      # 現在月からみての先月から１年前の各月の対象銘柄の平均株価を取得
      target_periods = [ latest_date ]

      (0...13).each do |i|
        target_periods << target_periods[i] - 30
      end

      month_average_price = []

      target_periods.each_cons(2) do |start_date, end_date|
        month_average_price << StockPrice.where(company_code: company_code, date: "#{end_date+1}".."#{start_date}")
                                         .average(:close_price)
      end


      # 現在月からみての先月から１年前の各月の対象銘柄の増減率を格納する配
      output = 0
      three_month_result = 0
      six_month_result = 0
      one_year_result = 0
      buy_price = current_price * quantity

      month_average_price.each_cons(2).with_index(1) do |(start_price, end_price), i|
        rate = ((start_price) / end_price)
        if i == 1
          output = buy_price * rate
        else
          output = (output + buy_price) * rate
        end
        three_month_result = output if i == 3
        six_month_result = output if i == 6
        one_year_result = output if i == 12
      end





      # 3m6m1yの積み立てシミュレーションの損益額
      accumulation_simulation = {
        "3_months_ago" => three_month_result.round(0) - (buy_price*3),
        "6_months_ago" => six_month_result.round(0) - (buy_price*6),
        "1_year_ago" => one_year_result.round(0) - (buy_price*12)
      }

      {
        code: company_code,
        name: name,
        current_price: current_price,
        quantity: quantity,
        simulation: simulation,
        accumulation_simulation: accumulation_simulation # 積み立てシミュレーションの損益額を返す
      }
    end


    render json: { results: simulated_results }, status: :ok
  end
end

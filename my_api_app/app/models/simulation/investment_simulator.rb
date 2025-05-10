# NOTE:
# フロントから送られてきた銘柄データ（コード・名前・価格・数量）を使って、
# 一括シミュレーション(one_time)と積立シミュレーション(accumulated)の結果をまとめたハッシュを返す。
# 返すJSONは,以下の通り（３ヶ月の場合の例）。
# "code": "83060",
# "name": "三菱ＵＦＪフィナンシャル・グループ",
# "current_price": 2178,
# "quantity": 1,
# "investments": [
#   {
#     "type": "one_time",
#     "simulations": [
#       { "period": "1_month", "value": 2772, "deposit": 2178 },
#       { "period": "2_month", "value": 2470, "deposit": 2178 },
#       { "period": "3_month", "value": 2496, "deposit": 2178 }
#     ]
#   },
#   {
#     "type": "accumulated",
#     "simulations": [
#       { "period": "1_month", "value": "2395.8", "deposit": 2178 },
#       { "period": "2_month", "value": "4791.6", "deposit": 4356 },
#       { "period": "3_month", "value": "7187.4", "deposit": 6534 }
#     ]
#   }
# ]

module Simulation
  module InvestmentSimulator
    TARGET_PERIODS = (1..12).to_a
    class << self
      def call(target)
        target_company_code, target_company_name, current_price, quantity  = target.values_at(:code, :name, :price, :quantity)
        {
          code: target_company_code,
          name: target_company_name,
          current_price: current_price,
          quantity: quantity,
          investments: [
            {
              type: "one_time",
              simulations: format_one_time_simulations(target_company_code, current_price, quantity)
            },
            {
              type: "accumulated",
              simulations: format_accumulated_simulations(target_company_code, current_price, quantity)
            }
          ]
        }
      end

      private

      def format_one_time_simulations(code, current_price, quantity)
        TARGET_PERIODS.map do |month|
          past_price = fetch_past_price(code, month)
          { period: "#{month}_month",
            value: (current_price**2 / past_price) * quantity,
            deposit: current_price * quantity }
        end
      end

      def fetch_past_price(code, n)
        start_date = Date.today
        end_date = start_date - n.months

        price = StockPrice.where(company_code: code, date: end_date..start_date)
                          .order(date: :asc)
                          .first&.close_price
      end

      def format_accumulated_simulations(code, current_price, quantity)
        average_growth_rate = calculate_average_growth_rate(code, current_price)
        current_amout = 0
        puts average_growth_rate

        TARGET_PERIODS.map do |month|
          buy_amout = current_price * quantity
          current_amout += buy_amout
          {
            period: "#{month}_month",
            value: average_growth_rate * current_amout,
            deposit: current_price * quantity * month
          }
        end
      end


      def fetch_past_average_price(code, month)
          start_date = Date.today - month.months
          end_date = start_date + 30.days

          StockPrice.where(company_code: code, date: start_date..end_date)
                    .average(:close_price)
      end

      def calculate_average_growth_rate(code, current_price)
        rates = TARGET_PERIODS.map do |i|
          from = fetch_past_average_price(code, i)
          to   = i == 1 ? current_price : fetch_past_average_price(code, i - 1)
          to / from
        end

        (rates.sum / rates.size).ceil(1)
      end
    end
  end
end

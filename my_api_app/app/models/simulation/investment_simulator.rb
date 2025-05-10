# NOTE:
# フロントから送られてきた銘柄データ（コード・名前・価格・数量）を使って、
# 一括シミュレーション(one_time)と積立シミュレーション(accumulated)の結果をまとめたハッシュを返す。
# 返すJSONは,以下の通り。
# {
#   code: "7203",
#   name: "トヨタ自動車",
#   current_price: 2530,
#   quantity: 1,
#   investments: [
#     {
#       type: "one_time",
#       simulations: [
#         { period: "3_month", value: 123000, deposit: 2530 },
#         { period: "6_month", value: 130000, deposit: 2530 },
#         { period: "9_month", value: 138000, deposit: 2530 },
#         { period: "12_month", value: 145000, deposit: 2530 }
#       ]
#     },
#     {
#       type: "accumulated",
#       simulations: [
#         { period: "3_month", value: 121000, deposit: 7590 },
#         { period: "6_month", value: 132000, deposit: 15180 },
#         { period: "9_month", value: 144000, deposit: 22770 },
#         { period: "12_month", value: 157000, deposit: 30360 }
#       ]
#     }
#   ]
# }

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
              simulations: format_one_time_simurations(target_company_code, current_price, quantity)
            },
            {
              type: "accumulated",
              simulations: format_accumulated_simurations(target_company_code, current_price, quantity)
            }
          ]
        }
      end

      private

      def format_one_time_simurations(code, current_price, quantity)
        TARGET_PERIODS.map do |month|
          past_price = fetch_past_price(code, month)
          { period: "#{month}_month",
            value: (current_price**2 / past_price) * quantity,
            deposit: current_price * quantity}
        end
      end

      def fetch_past_price(code, n)
        start_date = Date.today
        end_date = start_date - n.months

        price = StockPrice.where(company_code: code, date: end_date..start_date)
                          .order(date: :asc)
                          .first&.close_price
      end

      def format_accumulated_simurations(code, current_price, quantity)
        TARGET_PERIODS.map do |month|
          past_average_price = fetch_past_average_price(code, month)
          { period: "#{month}_month",
            value: current_amout + (current_price**2 / past_average_price) * quantity,
            deposit: current_price * quantity * month }
        end
      end

      def fetch_past_average_price(code, month)
        start_date = Date.today - month.months
        end_date = start_date + 30.days
        StockPrice.where(company_code: code, date: start_date..end_date)
                  .average(:close_price)
      end

      # # NOTE: 過去nヶ月分の月次平均株価を取得する。
      # # 直近から順に、毎月の平均株価を出すための範囲（開始〜終了）を構築している。
      # # なぜ +1 してるか → `each_cons(2)` を使って「期間ごとのペア」を作るため。
      # def collect_monthly_averages(target_company_code, most_recent_price_date, n)
      #   target_periods = (0..(n + 1)).map { |i| most_recent_price_date - i.months }
      #   target_periods.reverse.each_cons(2).map do |start_date, end_date|
      #     fetch_average_close_price(target_company_code, start_date, end_date)
      #   end
      # end

      # # NOTE: 月次平均価格のリストから、各月ごとの成長率（前月比）を計算する。
      # # 成長率 = 当月 / 前月
      # def calculate_monthly_growth_rates(monthly_average_prices)
      #   monthly_average_prices.each_cons(2).map do |previous_price, current_price|
      #     current_price / previous_price.to_f
      #   end
      # end

      # # NOTE: 積立シミュレーション用の評価額を計算。
      # # 毎月「同じ金額分の株を買った」と仮定し、成長率を掛けて累積していく。
      # # なぜ複利的か → 「前月までの評価額 + 新規積立額」を次の成長率に掛けているため。
      # def calculate_accumulation_simulation_price(current_price, quantity, target_company_code, most_recent_price_date, n)
      #   accumulated_price = current_price * quantity
      #   result = []
      #   accumulated_value = 0

      #   monthly_average_prices = collect_monthly_averages(target_company_code, most_recent_price_date, n)
      #   monthly_growth_rates = calculate_monthly_growth_rates(monthly_average_prices)

      #   monthly_growth_rates.each do |growth_rate|
      #     accumulated_value = (accumulated_value + accumulated_price) * growth_rate
      #     result << accumulated_value.round(0)
      #   end

      #   result
      # end

      # # NOTE: 積立シミュレーションの月次評価額（12ヶ月分）を元に、
      # # 特定の月（3・6・9・12ヶ月後）の評価額を返す。
      # def build_accumulation_simulation_price(current_price, quantity, target_company_code, most_recent_price_date)
      #   accumulated_prices = calculate_accumulation_simulation_price(current_price, quantity, target_company_code, most_recent_price_date, 12)

      #   {
      #     "3_months_ago" => accumulated_prices[2],
      #     "6_months_ago" => accumulated_prices[5],
      #     "9_months_ago" => accumulated_prices[8],
      #     "1_year_ago"   => accumulated_prices[11]
      #   }
      # end

      # def fetch_average_close_price(code, start_date, end_date)
      #   StockPrice.where(company_code: code, date: start_date..end_date)
      #             .average(:close_price)
      # end
    end
  end
end

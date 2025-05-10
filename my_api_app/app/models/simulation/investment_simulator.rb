# NOTE: フロントから送られてきた1つの銘柄データ（コード・名前・価格・数量）を使って、
# 通常のシミュレーションと積立シミュレーションの結果をまとめたハッシュを返す。
# 返すJSONは
# {
#   "code": "7203",
#   "name": "トヨタ自動車",
#   "current_price": 2530,
#   "quantity": 1,
#   "investments": [
#     {
#       "type": "one_time",
#       "simulations": [
#         { "period": "3_month", "value": 123000, "deposit": 2530 },
#         { "period": "6_month", "value": 130000, "deposit": 2530 },
#         { "period": "9_month", "value": 138000, "deposit": 2530 },
#         { "period": "12_month", "value": 145000, "deposit": 2530 }
#       ]
#     },
#     {
#       "type": "accumulated",
#       "simulations": [
#         { "period": "3_month", "value": 121000, "deposit": 7590 },
#         { "period": "6_month", "value": 132000, "deposit": 15180 },
#         { "period": "9_month", "value": 144000, "deposit": 22770 },
#         { "period": "12_month", "value": 157000, "deposit": 30360 }
#       ]
#     }
#   ]
# }



# シミュレーション結果に対しての、AIによる分析・診断結果も併せて返す。
module Simulation
  module InvestmentSimulator
    class << self
      def call(target)
        target_company_code, target_company_name, current_price, quantity  = target.values_at(:code, :name, :price, :quantity)
        most_recent_price_date   = fetch_most_recent_price_date(target_company_code)
        {
          code: target_company_code,
          name: target_company_name,
          current_price: current_price,
          quantity: quantity,
          simulation: build_simulation_price(target_company_code, current_price,quantity, most_recent_price_date),
          accumulation_simulation: build_accumulation_simulation_price(current_price, quantity, target_company_code, most_recent_price_date)
        }
      end

      private

      # NOTE: 一括投資シミュレーション。
      # 過去の株価と現在の成長率を用いて、保有数量に応じた評価額を月別に算出する。
      def build_simulation_price(target_company_code, current_price,quantity, most_recent_price_date)
        {
          "3_months_ago" =>  calculate_simulation_price(current_price, fetch_price_n_months_ago(target_company_code, most_recent_price_date, 3)) * quantity,
          "6_months_ago" =>  calculate_simulation_price(current_price, fetch_price_n_months_ago(target_company_code, most_recent_price_date, 6)) * quantity,
          "9_months_ago" =>  calculate_simulation_price(current_price, fetch_price_n_months_ago(target_company_code, most_recent_price_date, 9)) * quantity,
          "1_year_ago"   =>  calculate_simulation_price(current_price, fetch_price_n_months_ago(target_company_code, most_recent_price_date, 12)) * quantity
        }
      end

      # NOTE: 現在価格と過去価格の比率をもとに、評価額（資産価値）を予測する。
      # （実際は「過去価格で買って今の価格の成長率を乗せた評価額」という計算式）
      def  calculate_simulation_price(current_price, past_price)
        grow_rate = current_price  / past_price.to_f
        (current_price * grow_rate).round(0)
      end


      # NOTE: 過去nヶ月分の月次平均株価を取得する。
      # 直近から順に、毎月の平均株価を出すための範囲（開始〜終了）を構築している。
      # なぜ +1 してるか → `each_cons(2)` を使って「期間ごとのペア」を作るため。
      def collect_monthly_averages(target_company_code, most_recent_price_date, n)
        target_periods = (0..(n + 1)).map { |i| most_recent_price_date - i.months }
        target_periods.reverse.each_cons(2).map do |start_date, end_date|
          fetch_average_close_price(target_company_code, start_date, end_date)
        end
      end

      # NOTE: 月次平均価格のリストから、各月ごとの成長率（前月比）を計算する。
      # 成長率 = 当月 / 前月
      def calculate_monthly_growth_rates(monthly_average_prices)
        monthly_average_prices.each_cons(2).map do |previous_price, current_price|
          current_price / previous_price.to_f
        end
      end

      # NOTE: 積立シミュレーション用の評価額を計算。
      # 毎月「同じ金額分の株を買った」と仮定し、成長率を掛けて累積していく。
      # なぜ複利的か → 「前月までの評価額 + 新規積立額」を次の成長率に掛けているため。
      def calculate_accumulation_simulation_price(current_price, quantity, target_company_code, most_recent_price_date, n)
        accumulated_price = current_price * quantity
        result = []
        accumulated_value = 0

        monthly_average_prices = collect_monthly_averages(target_company_code, most_recent_price_date, n)
        monthly_growth_rates = calculate_monthly_growth_rates(monthly_average_prices)

        monthly_growth_rates.each do |growth_rate|
          accumulated_value = (accumulated_value + accumulated_price) * growth_rate
          result << accumulated_value.round(0)
        end

        result
      end

      # NOTE: 積立シミュレーションの月次評価額（12ヶ月分）を元に、
      # 特定の月（3・6・9・12ヶ月後）の評価額を返す。
      def build_accumulation_simulation_price(current_price, quantity, target_company_code, most_recent_price_date)
        accumulated_prices = calculate_accumulation_simulation_price(current_price, quantity, target_company_code, most_recent_price_date, 12)

        {
          "3_months_ago" => accumulated_prices[2],
          "6_months_ago" => accumulated_prices[5],
          "9_months_ago" => accumulated_prices[8],
          "1_year_ago"   => accumulated_prices[11]
        }
      end

      def fetch_most_recent_price_date(code)
        StockPrice.where(company_code: code)
                  .order(date: :desc)
                  .first
                  &.date
      end
    
      def fetch_price_n_months_ago(code, most_recent_price_date, n)
        date_range = (most_recent_price_date - n.months)..most_recent_price_date
        StockPrice.where(company_code: code, date: date_range)
                  .order(date: :asc)
                  .first
                  &.close_price
      end
    
      def fetch_average_close_price(code, start_date, end_date)
        StockPrice.where(company_code: code, date: start_date..end_date)
                  .average(:close_price)
      end
    end
  end
end

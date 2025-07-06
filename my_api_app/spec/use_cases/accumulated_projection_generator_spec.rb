require 'rails_helper'

RSpec.describe AccumulatedProjectionGenerator, type: :model do
  describe '#call' do
    let(:quantity) { 1 }
    let(:purchase_price) { 150 }

    let(:prices) do
      [
        build(:stock_price, date: 12.months.ago, close_price: 80),
        build(:stock_price, date: 11.months.ago, close_price: 85),
        build(:stock_price, date: 10.months.ago, close_price: 90),
        build(:stock_price, date: 9.months.ago, close_price: 95),
        build(:stock_price, date: 8.months.ago, close_price: 100),
        build(:stock_price, date: 7.months.ago, close_price: 105),
        build(:stock_price, date: 6.months.ago, close_price: 110),
        build(:stock_price, date: 5.months.ago, close_price: 115),
        build(:stock_price, date: 4.months.ago, close_price: 120),
        build(:stock_price, date: 3.months.ago, close_price: 125),
        build(:stock_price, date: 2.months.ago, close_price: 135),
        build(:stock_price, date: 1.month.ago, close_price: 140),
        build(:stock_price, date: Date.current, close_price: purchase_price)
      ]
    end

    let(:historical_averages) do
      [purchase_price] + (1..12).map do |month|
        period_start = month.months.ago
        period_end = (month - 1).months.ago
        prices_in_period = prices.select { |price| price.date >= period_start && price.date < period_end }
        prices_in_period.sum(&:close_price).to_f / prices_in_period.count
      end
    end
    
    let(:growth_rates) do
      historical_averages.reverse.each_cons(2).map { |old, new| (new.to_f / old).round(5) }
    end

    let(:result) { described_class.new(quantity, prices).call }

    it '12ヶ月分の予測結果を配列で返す' do
      expect(result.length).to eq(12)
      expect(result).to be_an(Array)
    end

    it '予測結果は、実際の成長率配列を使用して計算される' do
      monthly_investment = purchase_price * quantity

      # 1ヶ月目：1回分の投資
      expected_1month = (monthly_investment * growth_rates[0]).round
      expect(result[0][:period]).to eq("1_month")
      expect(result[0][:value]).to eq(expected_1month)
      expect(result[0][:deposit]).to eq(monthly_investment)

      # 2ヶ月目：2回分の投資（前月分 + 今月分）
      expected_2month = ((expected_1month + monthly_investment) * growth_rates[1]).round
      expect(result[1][:period]).to eq("2_month")
      expect(result[1][:value]).to eq(expected_2month)
      expect(result[1][:deposit]).to eq(monthly_investment * 2)

      # 3ヶ月目：3回分の投資（前々月分 + 前月分 + 今月分）
      expected_3month = ((expected_2month + monthly_investment) * growth_rates[2]).round
      expect(result[2][:period]).to eq("3_month")
      expect(result[2][:value]).to eq(expected_3month)
      expect(result[2][:deposit]).to eq(monthly_investment * 3)
    end
  end
end

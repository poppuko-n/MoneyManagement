RSpec.describe StockPrice::InvestmentSimulator do
  describe '一括投資と積立投資のシミュレーション' do
    let(:code) { 1 }
    let(:current_price) { 1200 }
    let(:quantity) { 2 }

    describe 'format_one_time_simulations(一括)' do
      # 各月の過去価格をすべて1000とする
      before do
        allow(described_class).to receive(:fetch_past_price).and_return(1000)
      end

      subject { described_class.send(:format_one_time_simulations, code, current_price, quantity) }

      it '一括投資の評価額と預金額が正しく計算され、12ヶ月分返ってくること' do
        aggregate_failures do
          # 12ヶ月分の結果が帰ってくる
          expect(subject.size).to eq(12)

          # 各月のpriodが"n_month"形式であること
          subject.each_with_index do |simulation, index|
            expect(simulation[:period]).to eq("#{index+1}_month")
          end

          # 各月の評価額(value)と預金(deposit)が正しく計算されている
          # 評価額の算出ロジック：
          # 現在価格 * (現在価格 / 過去価格) * quantity
          # = (current_price ** 2 / past_price) * quantity
          subject.each do |simulation|
            expect(simulation[:value]).to eq((current_price**2 / 1000) * quantity)
            expect(simulation[:deposit]).to eq(current_price * quantity)
          end
        end
      end
    end

    describe 'format_accumulated_simulations' do
      # 過去１年間の毎月の変動率を1.2とする
      before do
        allow(described_class).to receive(:calculate_average_growth_rate).and_return(1.2)
      end

      subject { described_class.send(:format_accumulated_simulations, code, current_price, quantity) }

      it '積み立て投資の評価額と預金額が正しく計算され、12ヶ月分返ってくること' do
          # 12ヶ月分の結果が帰ってくる
          expect(subject.size).to eq(12)

          # 各月のpriodが"n_month"形式であること
          subject.each_with_index do |simulation, index|
            expect(simulation[:period]).to eq("#{index+1}_month")
          end
      end
    end
  end
end

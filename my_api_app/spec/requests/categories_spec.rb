RSpec.describe "Categories", type: :request do
  describe "GET /categories" do
    let!(:food) { create(:category, name: '食費', transaction_type: '支出') }
    let!(:salary) { create(:category, name: '給料', transaction_type: '収入') }
    it '種別毎（支出、収入）のカテゴリを取得することができる' do
      get '/categories'
      aggregate_failures do
        expect(response).to have_http_status(:ok)

        response_body = response.parsed_body
        expect(response_body['expense_categories'][0]['name']).to eq('食費')
        expect(response_body['expense_categories'][0]['transaction_type']).to eq('支出')
        expect(response_body['income_categories'][0]['name']).to eq('給料')
        expect(response_body['income_categories'][0]['transaction_type']).to eq('収入')
      end
    end
  end
end

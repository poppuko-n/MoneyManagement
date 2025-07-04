RSpec.describe "Categories", type: :request do
  describe "GET /categories" do
    let!(:food) { create(:category, name: '食費', transaction_type: '支出') }
    let!(:salary) { create(:category, name: '給料', transaction_type: '収入') }
    it 'すべてのカテゴリを取得することができる' do
      get '/categories'
      aggregate_failures do
        expect(response).to have_http_status(:ok)

        response_body = response.parsed_body
        expect(response_body.size).to eq(2)

        food_category = response_body.find { |c| c['name'] == '食費' }
        salary_category = response_body.find { |c| c['name'] == '給料' }

        expect(food_category['transaction_type']).to eq('支出')
        expect(salary_category['transaction_type']).to eq('収入')
      end
    end
  end
end

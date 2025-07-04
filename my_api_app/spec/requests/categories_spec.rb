RSpec.describe "Categories", type: :request do
  describe "GET /categories" do
    it 'すべてのカテゴリを取得することができる' do
      food = create(:category, name: '食費', transaction_type: '支出')
      salary = create(:category, name: '給料', transaction_type: '収入')

      get '/categories'
      
      expect(response).to have_http_status(:ok)
      expect(response.parsed_body.size).to eq(2)
      expect(response.parsed_body.map { |c| c['name'] }).to match_array([food.name, salary.name])
    end
  end
end

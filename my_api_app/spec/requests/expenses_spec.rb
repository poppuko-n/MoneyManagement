require 'rails_helper'

RSpec.describe "Expenses", type: :request do
  let!(:user1) { create(:user1) }

  let!(:food) { create(:food) }
  let!(:salary) { create(:salary) }

  let!(:food_log) { create(:food_log, category: food,  user: user1) }
  let!(:salary_log) { create(:salary_log, category: salary, user: user1) }

  let(:headers) { { "Authorization" => "Bearer #{token}" } }
  let(:token) { generate_token(user1) }

  describe "GET /expenses" do
    context 'ログインユーザーがアクセスした時' do
      it '自分のログを取得することができる' do
        get '/expenses', headers: headers
        expect(response).to have_http_status(:ok)

        json = JSON.parse(response.body)
        expect(json.size).to eq(2)

        expect(json.first).to include(
          "id" => food_log.id,
          "transaction_type" => food.transaction_type,
          "date" => food_log.date.to_s,
          "item" => food_log.item,
          "amount" => food_log.amount,
          "category_name" => food.name
        )
      end
    end

    describe 'POST /expenses' do
      context '有効なパラメーターの場合' do
        it 'ログを登録することができる' do
          expect {
            post '/expenses', params: {
              expense: {
                category_id: food.id,
                date: Date.today,
                item: "昼食",
                amount: 1000
              }
            },headers: headers
          }.to change(ExpenseLog, :count).by(1)

          expect(response).to have_http_status(201)

          json = JSON.parse(response.body)
          expect(json).to include(
            "category_id" => food.id,
            "date" => Date.today.to_s,
            "item" => "昼食",
            "amount" => 1000,
            "user_id" => user1.id
          )

        end
      end
    end
  end
end

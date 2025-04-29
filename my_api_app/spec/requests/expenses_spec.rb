require 'rails_helper'

RSpec.describe "Expenses", type: :request do
  let(:user1) { create(:user, name: 'テストユーザー1') }
  let(:food) { create(:category, name: '食費', transaction_type: '支出') }
  let(:salary) { create(:category, name: '給与', transaction_type: '収入') }
  let(:headers) { { "Authorization" => "Bearer #{token}" } }
  let(:token) { generate_token(user1) }

  describe "GET /expenses" do
    context 'ログインユーザーがアクセスした時' do
      let!(:food_log) { create(:expense_log, date: Date.today, item: '昼食', amount: 1000,  category: food,  user: user1) }
      let!(:salary_log) { create(:expense_log, date: Date.today, item: '給与', amount: 200000,  category: salary,  user: user1) }
      it '自分のログを取得することができる' do
        get '/expenses', headers: headers
        aggregate_failures do
          expect(response).to have_http_status(:ok)
          expect(response.parsed_body.size).to eq(2)
          expect(response.parsed_body.first).to include(
            "id" => food_log.id,
            "transaction_type" => food.transaction_type,
            "date" => food_log.date.to_s,
            "item" => food_log.item,
            "amount" => food_log.amount,
            "category_name" => food.name
          )
        end
      end
    end
  end

  describe 'POST /expenses' do
    context '有効なパラメーターの場合' do
      it 'ログを登録することができる' do
        aggregate_failures do
          expect {
            post '/expenses', params: {
              expense: {
                category_id: food.id,
                date: Date.today,
                item: "昼食",
                amount: 1000
              }
            }, headers: headers
          }.to change(ExpenseLog, :count).by(1)

          expect(response).to have_http_status(201)
          expect(response.parsed_body).to include(
            "category_id" => food.id,
            "date" => Date.today.to_s,
            "item" => "昼食",
            "amount" => 1000,
            "user_id" => user1.id
          )
        end
      end
    end

    context '無効なパラメーターの場合' do
      it 'ログを登録することができない' do
        aggregate_failures do
          expect {
            post '/expenses', params: {
              expense: {
                category_id: '',
                date: '',
                item: '',
                amount: ''
              }
            }, headers: headers
          }.not_to change(ExpenseLog, :count)

          expect(response).to have_http_status(422)
          expected_errors = [
            'カテゴリー を入力してください',
            '日付 を入力してください',
            '内容 を入力してください',
            '金額 を入力してください',
            '金額 は数値で入力してください'
          ]
          expect(response.parsed_body['errors']).to eq(expected_errors)
        end
      end
    end
  end

  describe 'PATCH /expenses/:id' do
    let!(:food_log) { create(:expense_log, date: Date.today, item: '昼食', amount: 1000,  category: food,  user: user1) }
    context '有効なパラメーターの場合' do
      it 'ログを更新することができる' do
        patch "/expenses/#{food_log.id}", params: {
          expense: {
            category_id: food.id,
            date: Date.today,
            item: "更新された昼食",
            amount: 2000
          }
        }, headers: headers
        aggregate_failures do
          expect(response).to have_http_status(:ok)
          expect(response.parsed_body['item']).to eq('更新された昼食')
          expect(response.parsed_body['amount']).to eq(2000)
          food_log.reload
          expect(food_log.item).to eq('更新された昼食')
          expect(food_log.amount).to eq(2000)
        end
      end
    end

    context '無効なパラメーターの場合' do
      it 'ログを更新することができない' do
        patch "/expenses/#{food_log.id}", params: {
          expense: {
            category_id: food.id,
            date: Date.today,
            item: '',
            amount: 2000
          }
        }, headers: headers
        aggregate_failures do
          expect(response).to have_http_status(422)
          expect(response.parsed_body['errors']).to eq([ "内容 を入力してください" ])
          food_log.reload
          expect(food_log.item).to eq('昼食')
          expect(food_log.amount).to eq(1000)
        end
      end
    end

    context 'ログが存在しない場合' do
      it 'ログを更新することができない' do
        patch "/expenses/#{food_log.id+100}", params: {
          expense: {
            category_id: food.id,
            date: Date.today,
            item: "更新された昼食",
            amount: 2000
          }
        }, headers: headers
        expect(response).to have_http_status(404)
      end
    end
  end

  describe 'DELETE /expenses/:id' do
    let!(:food_log) { create(:expense_log, date: Date.today, item: '昼食', amount: 1000,  category: food,  user: user1) }
    context 'ログが存在する場合' do
      it 'ログを削除することができる' do
        aggregate_failures do
          expect {
            delete "/expenses/#{food_log.id}", headers: headers
          }.to change(ExpenseLog, :count).by(-1)

          expect(response).to have_http_status(204)
          expect(ExpenseLog.exists?(food_log.id)).to be false
        end
      end
    end

    context 'ログが存在しない場合' do
      it 'ログを削除することができない' do
        aggregate_failures do
          expect {
            delete "/expenses/#{food_log.id+100}", headers: headers
          }.not_to change(ExpenseLog, :count)
          expect(response).to have_http_status(404)
        end
      end
    end
  end
end

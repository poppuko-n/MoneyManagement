require 'rails_helper'

RSpec.describe "Expense_logs", type: :request do
  let(:user) { create(:user) }
  let(:category) { create(:category) }

  before { login_as(user) }

  describe "GET /expense_logs" do
    context 'ログインユーザーがアクセスした時' do
      let!(:current_log) { create(:expense_log, date: Date.new(2025, 5, 1), item: '昼食', amount: 1000, category: category, user: user) }
      let!(:current_log2) { create(:expense_log, date: Date.new(2025, 5, 1), item: '夕食', amount: 1500, category: category, user: user) }
      let!(:other_log) { create(:expense_log, date: Date.new(2024, 5, 1), item: '去年の昼食', amount: 800, category: category, user: user) }
      it '指定した年月の家計記録を取得することができる' do
        get '/expense_logs', params: { year: '2025', month: '05' }
        aggregate_failures do
          expect(response).to have_http_status(:ok)
          expect(response.parsed_body.size).to eq(2)
          expect(response.parsed_body.map { |e| e['item'] }).to include('昼食', '夕食')
          expect(response.parsed_body.map { |e| e['item'] }).not_to include('去年の昼食')
        end
      end
    end
  end

  describe 'POST /expense_logs' do
    context '有効なパラメーターの場合' do
      it 'ログを登録することができる' do
        aggregate_failures do
          expect {
            post '/expense_logs', params: {
              expense_log: {
                category_id: category.id,
                date: Date.today,
                item: "昼食",
                amount: 1000
              }
            }
          }.to change(ExpenseLog, :count).by(1)

          expect(response).to have_http_status(201)
          expect(response.parsed_body).to include(
            "category_id" => category.id,
            "date" => Date.today.to_s,
            "item" => "昼食",
            "amount" => 1000,
            "user_id" => user.id
          )
        end
      end
    end

    context '無効なパラメーターの場合' do
      it 'ログを登録することができない' do
        aggregate_failures do
          expect {
            post '/expense_logs', params: {
              expense_log: {
                category_id: '',
                date: '',
                item: '',
                amount: ''
              }
            }
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

  describe 'PATCH /expense_logs/:id' do
    let!(:expense_log) { create(:expense_log, date: Date.today, item: '昼食', amount: 1000, category: category, user: user) }
    context '有効なパラメーターの場合' do
      it 'ログを更新することができる' do
        patch "/expense_logs/#{expense_log.id}", params: {
          expense_log: {
            category_id: category.id,
            date: Date.today,
            item: "更新された昼食",
            amount: 2000
          }
        }
        aggregate_failures do
          expect(response).to have_http_status(:ok)
          expect(response.parsed_body['item']).to eq('更新された昼食')
          expect(response.parsed_body['amount']).to eq(2000)
          expense_log.reload
          expect(expense_log.item).to eq('更新された昼食')
          expect(expense_log.amount).to eq(2000)
        end
      end
    end

    context '無効なパラメーターの場合' do
      it 'ログを更新することができない' do
        patch "/expense_logs/#{expense_log.id}", params: {
          expense_log: {
            category_id: category.id,
            date: Date.today,
            item: '',
            amount: 2000
          }
        }
        aggregate_failures do
          expect(response).to have_http_status(422)
          expect(response.parsed_body['errors']).to eq([ "内容 を入力してください" ])
          expense_log.reload
          expect(expense_log.item).to eq('昼食')
          expect(expense_log.amount).to eq(1000)
        end
      end
    end

    context 'ログが存在しない場合' do
      it 'ログを更新することができない' do
        patch "/expense_logs/#{expense_log.id+100}", params: {
          expense_log: {
            category_id: category.id,
            date: Date.today,
            item: "更新された昼食",
            amount: 2000
          }
        }
        expect(response).to have_http_status(404)
      end
    end
  end

  describe 'DELETE /expense_logs/:id' do
    let!(:expense_log) { create(:expense_log, date: Date.today, item: '昼食', amount: 1000, category: category, user: user) }
    context 'ログが存在する場合' do
      it 'ログを削除することができる' do
        aggregate_failures do
          expect {
            delete "/expense_logs/#{expense_log.id}"
          }.to change(ExpenseLog, :count).by(-1)

          expect(response).to have_http_status(204)
          expect(ExpenseLog.exists?(expense_log.id)).to be false
        end
      end
    end

    context 'ログが存在しない場合' do
      it 'ログを削除することができない' do
        aggregate_failures do
          expect {
            delete "/expense_logs/#{expense_log.id+100}"
          }.not_to change(ExpenseLog, :count)
          expect(response).to have_http_status(404)
        end
      end
    end
  end
end

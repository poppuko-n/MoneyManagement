require 'rails_helper'

RSpec.describe "Sessions", type: :request do
  let(:user) { create(:user, name: 'テストユーザー', password: 'password1') }

  describe "POST /session" do
    context "有効な認証情報の場合" do
      it "ログインできる" do
        post "/session", params: { name: user.name, password: user.password }
        expect(response).to have_http_status(:ok)
      end
    end

    context "無効な認証情報の場合" do
      it "ログインできない" do
        post "/session", params: { name: user.name, password: 'wrong_password' }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "DELETE /session" do
    it "ログアウトできる" do
      post "/session", params: { name: user.name, password: user.password }
      delete "/session"
      expect(response).to have_http_status(:ok)
    end
  end
end

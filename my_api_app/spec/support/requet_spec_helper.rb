module RequestSpecHelper
  def generate_token(user)
    JWT.encode({ user_id: user.id }, Rails.application.credentials.secret_key_base)
  end
end

RSpec.configure do |config|
  config.include RequestSpecHelper, type: :request
end

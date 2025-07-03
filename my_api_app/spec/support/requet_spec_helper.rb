module RequestSpecHelper
  def login_as(user)
    post '/session', params: { name: user.name, password: user.password }
  end
end

RSpec.configure do |config|
  config.include RequestSpecHelper, type: :request
end

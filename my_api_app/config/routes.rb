Rails.application.routes.draw do
  root to: proc { [ 200, {}, [ "OK" ] ] }

  resources :companies, only: %i[index]
  resources :categories, only: %i[index]
  resources :expense_logs, only: %i[index show create update destroy]
  resources :users, only: %i[create]

  namespace :stock_price do
    resources :simulation_results, only: %i[create]
  end

  resources :stock_prices, only: [] do
    collection do
      post :refresh
    end
  end

  post "/login", to: "users#login"
end

Rails.application.routes.draw do
  root to: proc { [ 200, {}, [ "OK" ] ] }

  post "stock_prices/update", to: "stock_prices#update"

  resources :companies, only: %i[index]
  resources :categories, only: %i[index]
  resources :expense_logs, only: %i[index show create update destroy]
  resources :users, only: %i[create]
  resources :stock_prices, only: %i[update]
  resources :simulation_results, only: %i[create]

  post "/login", to: "users#login"
end

Rails.application.routes.draw do
  root to: proc { [ 200, {}, [ "OK" ] ] }

  get "expense_logs/export", to: "expense_logs#export"

  post "stock_prices/simulate", to: "stock_prices#simulate"
  post "stock_prices/update", to: "stock_prices#update"

  resources :companies, only: [ :index ]
  resources :expense_logs, only: [ :index, :show, :create, :update, :destroy ]
  resources :categories, only: [ :index ]
  resources :users, only: [ :create ]

  post "/login", to: "users#login"
end

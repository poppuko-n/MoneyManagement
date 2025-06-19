Rails.application.routes.draw do
  root to: proc { [ 200, {}, [ "OK" ] ] }

  resources :users, only: %i[create]
  resources :categories, only: %i[index]
  resources :expense_logs, only: %i[index show create update destroy]
  resources :companies, only: %i[index]

  namespace :stock_prices do
    resources :projections, only: %i[create]
    resources :projections_analyses, only: %i[create]
    resources :refreshes, only: %i[create]
  end

  post "/login", to: "users#login"
end

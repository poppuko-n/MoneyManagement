Rails.application.routes.draw do
  root to: proc { [ 200, {}, [ "OK" ] ] }

  resources :users, only: %i[create]
  resources :categories, only: %i[index]
  resources :expense_logs, only: %i[index show create update destroy]
  resources :companies, only: %i[index]
  resource :session, only: %i[show create destroy]

  namespace :stock_prices do
    resources :projections, only: %i[index]
    resources :projection_analyses, only: %i[index]
    resources :refreshes, only: %i[create]
  end
end

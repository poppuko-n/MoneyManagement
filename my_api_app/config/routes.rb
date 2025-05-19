Rails.application.routes.draw do
  root to: proc { [ 200, {}, [ "OK" ] ] }

  get "expenses/export", to: "expenses#export"

  resources :companies, only: [ :index ]
  resources :simulations, only: [ :create ]
  resources :stock_price_update, only: [ :create ]
  resources :expenses, only: [ :index, :create, :show, :update, :destroy ]
  resources :categories, only: [ :index ]
  resources :users, only: [ :create ]

  post "/login", to: "users#login"

end

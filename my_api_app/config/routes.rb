Rails.application.routes.draw do
  root to: proc { [ 200, {}, [ "OK" ] ] }

  get "expenses/export", to: "expenses#export"

  post "stock_price/update", to: "stock_price#update"

  resources :companies, only: [ :index ]
  resources :simulations, only: [ :create ]
  resources :expenses, only: [ :index, :create, :show, :update, :destroy ]
  resources :categories, only: [ :index ]
  resources :users, only: [ :create ]

  post "/login", to: "users#login"
end

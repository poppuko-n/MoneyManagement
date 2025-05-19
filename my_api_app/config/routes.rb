Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  # get "up" => "rails/health#show", as: :rails_health_check
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

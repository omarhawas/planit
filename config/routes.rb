Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root to: "home#index"

  get '/events/create', to: 'events#create_page'

  devise_for :users
  resources :events, only: [:index, :create, :show, :update, :destroy]

end

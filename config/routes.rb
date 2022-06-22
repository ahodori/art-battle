Rails.application.routes.draw do

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  resources :votes, only: [:show, :create, :update]
  resources :battles, only: [:index, :show, :create]
  resources :submissions, only: [:show, :create]
  resources :users, only: [:show, :create]

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  post "/endbattle/:id", to: "battles#end_battle"

end

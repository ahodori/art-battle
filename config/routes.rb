Rails.application.routes.draw do
  resources :votes
  resources :battles
  resources :submissions
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

end

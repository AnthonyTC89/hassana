Rails.application.routes.draw do
  resources :testimonials
  # resources :users, only: [:login]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post "/login", to: "users#login"
  namespace :api do
      resources :recipes, only: [:index, :create, :destroy]
  end
end

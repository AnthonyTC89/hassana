Rails.application.routes.draw do
  # resources :users, only: [:login]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post "/login", to: "users#login"
  namespace :api do
    resources :services, only: [:index, :create, :update, :destroy]
    get "/full_services", to: "services#full_index"

    resources :promotions, only: [:index, :create, :update, :destroy]
    get "/full_promotions", to: "promotions#full_index"

    resources :testimonials, only: [:index, :create, :update, :destroy]
    get "/full_testimonials", to: "testimonials#full_index"
    
    resources :recipes, only: [:index, :create, :destroy]
  end
end

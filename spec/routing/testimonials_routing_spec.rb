require "rails_helper"

RSpec.describe TestimonialsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/testimonials").to route_to("testimonials#index")
    end

    it "routes to #show" do
      expect(:get => "/testimonials/1").to route_to("testimonials#show", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/testimonials").to route_to("testimonials#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/testimonials/1").to route_to("testimonials#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/testimonials/1").to route_to("testimonials#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/testimonials/1").to route_to("testimonials#destroy", :id => "1")
    end
  end
end

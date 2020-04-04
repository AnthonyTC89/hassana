require "rails_helper"

RSpec.describe HeadersController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/headers").to route_to("headers#index")
    end

    it "routes to #show" do
      expect(:get => "/headers/1").to route_to("headers#show", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/headers").to route_to("headers#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/headers/1").to route_to("headers#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/headers/1").to route_to("headers#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/headers/1").to route_to("headers#destroy", :id => "1")
    end
  end
end

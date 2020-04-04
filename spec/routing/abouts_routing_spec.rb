require "rails_helper"

RSpec.describe AboutsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/abouts").to route_to("abouts#index")
    end

    it "routes to #show" do
      expect(:get => "/abouts/1").to route_to("abouts#show", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/abouts").to route_to("abouts#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/abouts/1").to route_to("abouts#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/abouts/1").to route_to("abouts#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/abouts/1").to route_to("abouts#destroy", :id => "1")
    end
  end
end

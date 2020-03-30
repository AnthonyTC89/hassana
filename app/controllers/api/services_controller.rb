module Api
  class ServicesController < ApplicationController
    before_action :set_service, only: [:update, :destroy]

    # GET /services
    def index
      @services = Service.all
      render json: @services
    end

    def full_index
      @query = "SELECT s.id, s.title, s.text, s.benefits, s.status, s.recipe_id, r.location, r.key FROM Services as s INNER JOIN Recipes as r ON s.recipe_id = r.id"
      @services = Service.connection.select_all(@query).to_a
      render json: @services
    end

    # GET /services/1
    def show
      render json: @service
    end

    # POST /services
    def create
      @service = Service.new(service_params)

      if @service.save
        render json: @service, status: :created
      else
        render json: @service.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /services/1
    def update
      if @service.update(service_params)
        render json: @service
      else
        render json: @service.errors, status: :unprocessable_entity
      end
    end

    # DELETE /services/1
    def destroy
      @service.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_service
        @service = Service.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def service_params
        params.require(:service).permit(:title, :text, :benefits, :status, :recipe_id)
      end
  end
end
module Api
  class PromotionsController < ApplicationController
    before_action :set_promotion, only: [:update, :destroy]

    # GET /promotions
    def index
      @promotions = Promotion.all
      render json: @promotions
    end

    def full_index
      @query = "SELECT p.id, p.title, p.text, p.status, p.recipe_id, r.location, r.key FROM Promotions as p INNER JOIN Recipes as r ON p.recipe_id = r.id"
      @testimonials = Promotion.connection.select_all(@query).to_a
      render json: @testimonials
    end
    # GET /promotions/1
    # def show
    #   render json: @promotion
    # end

    # POST /promotions
    def create
      @promotion = Promotion.new(promotion_params)

      if @promotion.save
        render json: @promotion, status: :created
      else
        render json: @promotion.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /promotions/1
    def update
      if @promotion.update(promotion_params)
        render json: @promotion
      else
        render json: @promotion.errors, status: :unprocessable_entity
      end
    end

    # DELETE /promotions/1
    def destroy
      @promotion.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_promotion
        @promotion = Promotion.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def promotion_params
        params.require(:promotion).permit(:title, :text, :status, :recipe_id)
      end
  end
end
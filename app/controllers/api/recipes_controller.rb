module Api
  class RecipesController < ApplicationController
    before_action :set_recipe, only: [:destroy]

    # GET /recipes
    def index
      @recipes = Recipe.all
      render json: @recipes
    end

    # POST /recipes
    def create
      @recipe = Recipe.new(recipe_params)
      if @recipe.save
        render json: @recipe, status: :created
      else
        render json: @recipe.errors, status: :unprocessable_entity
      end
    end

    # DELETE /recipes/1
    def destroy
      @recipe.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_recipe
        @recipe = Recipe.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def recipe_params
        params.require(:recipe).permit(:bucket, :key, :location)
      end
  end
end
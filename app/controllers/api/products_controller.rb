module Api
  class ProductsController < ApplicationController
    before_action :set_product, only: [:update, :destroy]

    # GET /products
    def index
      @products = Product.all

      render json: @products
    end

    def full_index
      @query = "SELECT p.id, p.title, p.text, p.benefits, p.status, p.recipe_id, r.location, r.key FROM Products as p INNER JOIN Recipes as r ON p.recipe_id = r.id"
      @products = Product.connection.select_all(@query).to_a
      render json: @products
    end

    # GET /products/1
    # def show
    #   render json: @product
    # end

    # POST /products
    def create
      @product = Product.new(product_params)

      if @product.save
        render json: @product, status: :created
      else
        render json: @product.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /products/1
    def update
      if @product.update(product_params)
        render json: @product
      else
        render json: @product.errors, status: :unprocessable_entity
      end
    end

    # DELETE /products/1
    def destroy
      @product.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_product
        @product = Product.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def product_params
        params.require(:product).permit(:title, :text, :benefits, :status, :recipe_id)
      end
  end
end
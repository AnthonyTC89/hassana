module Api
  class AboutsController < ApplicationController
    before_action :set_about, only: [:update]

    # GET /abouts
    # def index
    #   @abouts = About.all
    #   render json: @abouts
    # end

    # GET /headers
    def full_index
      @query = "SELECT a.id, a.title, a.text, a.recipe_id, r.location, r.key FROM Abouts as a INNER JOIN Recipes as r ON a.recipe_id = r.id WHERE a.status=true"
      @abouts = About.connection.select_all(@query).to_a
      render json: @abouts
    end

    # GET /abouts/1
    # def show
    #   render json: @about
    # end

    # POST /abouts
    # def create
    #   @about = About.new(about_params)

    #   if @about.save
    #     render json: @about, status: :created
    #   else
    #     render json: @about.errors, status: :unprocessable_entity
    #   end
    # end

    # PATCH/PUT /abouts/1
    def update
      if @about.update(about_params)
        render json: @about
      else
        render json: @about.errors, status: :unprocessable_entity
      end
    end

    # DELETE /abouts/1
    # def destroy
    #   @about.destroy
    # end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_about
        @about = About.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def about_params
        params.require(:about).permit(:title, :text, :status, :recipe_id)
      end
  end
end
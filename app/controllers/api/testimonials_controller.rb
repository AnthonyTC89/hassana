module Api
  class TestimonialsController < ApplicationController
    before_action :set_testimonial, only: [:update, :destroy]

    # GET /testimonials
    def index
      @testimonials = Testimonial.all
      render json: @testimonials
    end

    def full_index
      @query = "SELECT t.id, t.text, t.status, t.recipe_id, r.location, r.key FROM testimonials as t INNER JOIN recipes as r ON t.recipe_id = r.id"
      @testimonials = Testimonial.connection.select_all(@query).to_a
      render json: @testimonials
    end
    
    # GET /testimonials/1
    # def show
    #   render json: @testimonial
    # end

    # POST /testimonials
    def create
      @testimonial = Testimonial.new(testimonial_params)
      if @testimonial.save
        render json: @testimonial, status: :created
      else
        render json: @testimonial.errors.full_messages, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /testimonials/1
    def update
      if @testimonial.update(testimonial_params)
        render json: @testimonial
      else
        render json: @testimonial.errors, status: :unprocessable_entity
      end
    end

    # DELETE /testimonials/1
    def destroy
      @testimonial.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_testimonial
        @testimonial = Testimonial.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def testimonial_params
        params.require(:testimonial).permit(:text, :status, :recipe_id)
      end
  end
end
class TestimonialsController < ApplicationController
  before_action :set_testimonial, only: [:show, :update, :destroy]

  # GET /testimonials
  def index
    @testimonials = Testimonial.all

    render json: @testimonials
  end

  # GET /testimonials/1
  def show
    render json: @testimonial
  end

  # POST /testimonials
  def create
    @testimonial = Testimonial.new(testimonial_params)

    if @testimonial.save
      render json: @testimonial, status: :created, location: @testimonial
    else
      render json: @testimonial.errors, status: :unprocessable_entity
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
      params.require(:testimonial).permit(:description)
    end
end

module Api
  class ContactsController < ApplicationController
    before_action :set_contact, only: [:update]

    # GET /contacts
    # def index
    #   @contacts = Contact.all

    #   render json: @contacts
    # end

    def full_index
      @query = "SELECT c.id, c.title, c.email, c.mobile, c.address, c.zoom, c.lat, c.lng, c.recipe_id, r.location, r.key FROM Contacts as c INNER JOIN Recipes as r ON c.recipe_id = r.id"
      @contacts = Contact.connection.select_all(@query).to_a
      render json: @contacts
    end

    # GET /contacts/1
    # def show
    #   render json: @contact
    # end

    # POST /contacts
    # def create
    #   @contact = Contact.new(contact_params)

    #   if @contact.save
    #     render json: @contact, status: :created, location: @contact
    #   else
    #     render json: @contact.errors, status: :unprocessable_entity
    #   end
    # end

    # PATCH/PUT /contacts/1
    def update
      if @contact.update(contact_params)
        render json: @contact
      else
        render json: @contact.errors, status: :unprocessable_entity
      end
    end

    # DELETE /contacts/1
    # def destroy
    #   @contact.destroy
    # end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_contact
        @contact = Contact.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def contact_params
        params.require(:contact).permit(:title, :email, :mobile, :address, :zoom, :lat, :lng, :status, :recipe_id)
      end
  end
end
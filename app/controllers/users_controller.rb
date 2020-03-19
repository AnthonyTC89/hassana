class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update]

  # POST /login
  def login
    @user = User.find_by(username: params[:username])
    if @user 
      if @user.authenticate(params[:password])
        render json: @user, status: :accepted
      else
        render json: @user.errors, status: :unauthorized
      end
    else
      render json: @user, status: :not_found
    end
  end

  # GET /users/1
  def show
    render json: @user
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:username, :email, :password_digest)
    end
end

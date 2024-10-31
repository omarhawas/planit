class ApplicationController < ActionController::API
    before_action :set_current_user

    def set_current_user
        @current_user = User.find(params[:user_id]) if params[:user_id]
    end

    def current_user
        @current_user
    end

end

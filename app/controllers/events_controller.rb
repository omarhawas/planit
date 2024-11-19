class EventsController < ApplicationController
    before_action :set_event, only: [:show, :update, :destroy]
  
    def create
      event = Event.new(event_params)
      event.user = current_user
  
      if event.save
        render json: event, status: :created
      else
        render json: { errors: event.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def index
        @events = Event.all.order(created_at: :desc)
    
        respond_to do |format|
          format.html # This renders the HTML page with React
          format.json { render json: @events } # This serves JSON for React's fetch
        end
    end
  
    def show
      render json: { event: @event }
    end
  
    def update
      if @event.update(event_params)
        render json: { event: @event }
      else
        render json: { errors: @event.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def destroy
      @event.destroy
      render json: { message: 'Event deleted successfully' }, status: :ok
    end
  
    private
  
    def set_event
      @event = Event.find_by(id: params[:id])
      render json: { errors: 'Event not found' }, status: :not_found unless @event
    end
  
    def event_params
      params.require(:event).permit(:title, :description, :date, :time, :location)
    end
  end
  
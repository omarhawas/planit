class Event < ApplicationRecord
  belongs_to :user

  validates :title, :date, :description, :time, :location, presence: true
end

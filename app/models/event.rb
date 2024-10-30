class Event < ApplicationRecord
  belongs_to :user

  validates :title, :date, :location, presence: true
end

class Testimonial < ApplicationRecord
  belongs_to :recipe

  validates :text, presence: true
  validates :recipe, presence: true
end

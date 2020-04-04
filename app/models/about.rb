class About < ApplicationRecord
  belongs_to :recipe

  validates :title, presence: true
  validates :text, presence: true
  validates :recipe, presence: true
end

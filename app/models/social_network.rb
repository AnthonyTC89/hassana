class SocialNetwork < ApplicationRecord
  belongs_to :recipe, optional: true

  validates :name, presence: true
  validates :status, presence: true
end

class SocialNetwork < ApplicationRecord
  belongs_to :recipe, optional: true

  validates :name, presence: true
  validates :href, presence: true
  validates :src, presence: true
end

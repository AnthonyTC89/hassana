class Recipe < ApplicationRecord
  validates :bucket, presence: true
  validates :key, presence: true
  validates :location, presence: true, uniqueness: true
end

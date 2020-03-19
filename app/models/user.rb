class User < ApplicationRecord
  has_secure_password

  validates :username, length: { minimum: 5 }
  validates :email, presence: true, uniqueness: true
  validates_format_of :email, with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
end

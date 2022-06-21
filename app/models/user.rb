class User < ApplicationRecord
    has_secure_password
    has_many :submissions
    has_many :votes
    has_many :battles, through: :submissions

    validates :username, presence: true
    validates :username, uniqueness: true
end

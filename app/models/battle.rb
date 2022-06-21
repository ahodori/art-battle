class Battle < ApplicationRecord
    has_many :submissions
    has_many :users, through: :submissions
    has_many :votes, through: :submissions

    validates :name, presence: true
    validates :prompt, presence: true

    validates :prompt, length: { in: 3..50 }
end

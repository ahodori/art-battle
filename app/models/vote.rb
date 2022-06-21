class Vote < ApplicationRecord
    belongs_to :user
    belongs_to :submission
    has_one :battle, through: :submission

    validates :user_id, presence: true
    validates :submission_id, presence: true
    validates :score, presence: true

    validates :user_id, uniqueness: { scope: :submission_id, message: "Only one vote per submission per user is allowed"}
end

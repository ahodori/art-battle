class Submission < ApplicationRecord
    belongs_to :user
    belongs_to :battle
    has_many :votes

    validates :user_id, presence: true
    validates :battle_id, presence: true
    validates :name, presence: true
    validates :url, presence: true

    validates :user_id, uniqueness: { scope: :battle_id, message: "Only one submission per user per battle is allowed"}
    #validate :battle_id, :battle_exists_and_is_open

    def battle_exists_and_is_open
        battle = Battle.find_by(battle_id)
        unless battle
            errors.add(:battle_id, ", battle does not exist")
        end
        unless battle.is_ended == false
            errors.add(:battle_id, ", battle is already closed to submissions")
        end
    end
end

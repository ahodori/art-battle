class VoteSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :submission_id, :score
end

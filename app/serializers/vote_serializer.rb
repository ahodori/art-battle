class VoteSerializer < ActiveModel::Serializer
  attributes :id, :submission_id, :score
end

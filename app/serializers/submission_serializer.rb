class SubmissionSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :battle_id, :name, :url
end

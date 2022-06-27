class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :avatar_url, :is_admin
end

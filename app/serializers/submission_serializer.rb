class SubmissionSerializer < ActiveModel::Serializer
  attributes :id, :name, :url
  attribute :user
  
  def user
    found_user = User.find_by(id: object.user_id)
    return {id: found_user.id, username: found_user.username}
  end

end

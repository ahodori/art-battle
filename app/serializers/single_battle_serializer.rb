class SingleBattleSerializer < ActiveModel::Serializer

  attributes :id, :name, :prompt, :is_ended, :winner, :votes
  has_many :submissions

  def votes
    return nil unless current_user

    return object.votes.filter {|vote| vote.user_id == current_user}
  end
end

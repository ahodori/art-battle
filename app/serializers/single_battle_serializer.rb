class SingleBattleSerializer < ActiveModel::Serializer

  attributes :id, :name, :prompt, :is_ended, :winner, :votes
  has_many :submissions

  def votes
    return nil unless current_user

    user_votes = object.votes.filter {|vote| vote.user_id == current_user.id}
    return user_votes.map { |user_vote| {submission_id: user_vote.submission_id, score: user_vote.score}}
  end

  def winner
    return nil unless object.winner
    battle_winner = Submission.find(object.winner)

    return {id: battle_winner.id, name: battle_winner.name, url: battle_winner.url, username: battle_winner.user.username}
  end
end

class BattleSerializer < ActiveModel::Serializer
  attributes :id, :name, :is_ended, :winner, :num_entrants

  def num_entrants
    object.submissions.length
  end

  def winner
    if object.winner
      Submission.find_by(id: object.winner)
    else
      nil
    end
  end
end

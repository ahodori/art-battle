class BattleSerializer < ActiveModel::Serializer
  attributes :id, :name, :prompt, :is_ended, :winner
end

class CreateBattles < ActiveRecord::Migration[7.0]
  def change
    create_table :battles do |t|
      t.string :name
      t.string :prompt
      t.boolean :is_ended
      t.integer :winner

      t.timestamps
    end
  end
end

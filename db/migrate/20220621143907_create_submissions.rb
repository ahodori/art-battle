class CreateSubmissions < ActiveRecord::Migration[7.0]
  def change
    create_table :submissions do |t|
      t.integer :user_id
      t.integer :battle_id
      t.string :name
      t.string :url

      t.timestamps
    end
  end
end

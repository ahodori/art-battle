class CreateVotes < ActiveRecord::Migration[7.0]
  def change
    create_table :votes do |t|
      t.integer :user_id
      t.integer :submission_id
      t.integer :score

      t.timestamps
    end
  end
end

class CreateHeaders < ActiveRecord::Migration[6.0]
  def change
    create_table :headers do |t|
      t.string :title
      t.string :text
      t.boolean :status, default: true
      t.references :recipe, null: false, foreign_key: true

      t.timestamps
    end
  end
end

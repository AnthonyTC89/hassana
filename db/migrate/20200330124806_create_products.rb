class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.string :title
      t.string :text
      t.string :befenits
      t.string :status, default: true
      t.references :recipe, null: false, foreign_key: true

      t.timestamps
    end
  end
end

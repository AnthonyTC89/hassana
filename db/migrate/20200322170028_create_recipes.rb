class CreateRecipes < ActiveRecord::Migration[6.0]
  def change
    create_table :recipes do |t|
      t.string :bucket
      t.string :key
      t.string :location
      
      t.timestamps
    end
  end
end

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_04_05_180414) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "abouts", force: :cascade do |t|
    t.string "title"
    t.string "text"
    t.boolean "status", default: true
    t.bigint "recipe_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["recipe_id"], name: "index_abouts_on_recipe_id"
  end

  create_table "contacts", force: :cascade do |t|
    t.string "title"
    t.string "email"
    t.string "mobile"
    t.string "address"
    t.integer "zoom"
    t.decimal "lat"
    t.decimal "lng"
    t.boolean "status", default: true
    t.bigint "recipe_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["recipe_id"], name: "index_contacts_on_recipe_id"
  end

  create_table "headers", force: :cascade do |t|
    t.string "title"
    t.string "text"
    t.boolean "status", default: true
    t.bigint "recipe_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["recipe_id"], name: "index_headers_on_recipe_id"
  end

  create_table "products", force: :cascade do |t|
    t.string "title"
    t.string "text"
    t.string "benefits"
    t.boolean "status", default: true
    t.bigint "recipe_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["recipe_id"], name: "index_products_on_recipe_id"
  end

  create_table "promotions", force: :cascade do |t|
    t.string "title"
    t.string "text"
    t.boolean "status", default: true
    t.bigint "recipe_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["recipe_id"], name: "index_promotions_on_recipe_id"
  end

  create_table "recipes", force: :cascade do |t|
    t.string "bucket"
    t.string "key"
    t.string "location"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "services", force: :cascade do |t|
    t.string "title"
    t.string "text"
    t.string "benefits"
    t.boolean "status", default: true
    t.bigint "recipe_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["recipe_id"], name: "index_services_on_recipe_id"
  end

  create_table "social_networks", force: :cascade do |t|
    t.string "name"
    t.string "href"
    t.string "src"
    t.boolean "status"
    t.bigint "recipe_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["recipe_id"], name: "index_social_networks_on_recipe_id"
  end

  create_table "testimonials", force: :cascade do |t|
    t.string "text"
    t.boolean "status", default: true
    t.bigint "recipe_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["recipe_id"], name: "index_testimonials_on_recipe_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.integer "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "abouts", "recipes"
  add_foreign_key "contacts", "recipes"
  add_foreign_key "headers", "recipes"
  add_foreign_key "products", "recipes"
  add_foreign_key "promotions", "recipes"
  add_foreign_key "services", "recipes"
  add_foreign_key "social_networks", "recipes"
  add_foreign_key "testimonials", "recipes"
end

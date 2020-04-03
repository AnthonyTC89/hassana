# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create(username: 'admin', email: 'ptonyptc@gmail.com', password: 'admin', password_confirmation: 'admin')
SocialNetwork.create(name: 'facebook', href: 'https://www.facebook.com/hassanamasajessalud/', src: 'https://img.icons8.com/bubbles/50/000000/facebook-new.png', status: 1)
SocialNetwork.create(name: 'instagram', href: 'https://www.instagram.com/', src: 'https://img.icons8.com/bubbles/50/000000/instagram-new.png', status: 0)
SocialNetwork.create(name: 'twitter', href: 'https://twitter.com/', src: 'https://img.icons8.com/bubbles/50/000000/twitter.png', status: 0)
SocialNetwork.create(name: 'youtube', href: 'https://www.youtube.com/', src: 'https://img.icons8.com/bubbles/50/000000/youtube-squared.png', status: 0)
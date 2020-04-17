# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

admin = ENV['ADMIN_USER']
password = ENV['ADMIN_PASSWORD']
email = ENV['ADMIN_EMAIL']
bucket = ENV['REACT_APP_S3_BUCKET']
location = "https://#{bucket}.s3.amazonaws.com/logo.jpeg"
lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at ultricies ante, id suscipit sapien. Maecenas in imperdiet nisi. Pellentesque rhoncus nisi odio, ac blandit tellus bibendum elementum.'

User.create(username: admin, email: email, password: password, password_confirmation: password, status: 1)
SocialNetwork.create(name: 'facebook', href: 'https://www.facebook.com/', src: 'https://img.icons8.com/bubbles/50/000000/facebook-new.png', status: true)
SocialNetwork.create(name: 'instagram', href: 'https://www.instagram.com/', src: 'https://img.icons8.com/bubbles/50/000000/instagram-new.png', status: false)
SocialNetwork.create(name: 'twitter', href: 'https://twitter.com/', src: 'https://img.icons8.com/bubbles/50/000000/twitter.png', status: false)
SocialNetwork.create(name: 'youtube', href: 'https://www.youtube.com/', src: 'https://img.icons8.com/bubbles/50/000000/youtube-squared.png', status: false)
recipe = Recipe.create(bucket: bucket, key: 'logo.jpeg', location: location)
Header.create(title: 'Title', text: lorem.slice(0,20), recipe: recipe)
About.create(title: 'About', text: lorem, recipe: recipe)
Contact.create(title: 'Contact', email: 'email@dominio.com', mobile: '987654321', address: 'address', zoom: 15, lat: -16.4360, lng: -71.52605, recipe: recipe)
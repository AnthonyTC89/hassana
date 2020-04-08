<p align="center">
  <h1 align="center">Hassana Massage & HealthCare Web Page</h1>
  <p align="center">
    Project Create with React and RailsAPI
    <br>
    <br>
    <a href="https://hassana-massages.herokuapp.com/" target="_blank">Live Demo</a>
    .
    <a href="https://github.com/AnthonyTC89/hassana/issues">Report Bug</a>
    ·
    <a href="https://github.com/AnthonyTC89/hassana/issues">Request Feature</a>
  </p>
</p>

![Screenshot](/screenshots/01.png)

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
* [Built With](#built-with)
* [Installation](#installation)

<!-- ABOUT THE PROJECT -->
## About The Project

This project is a Web Page for a business in Arequipa, Peru. The owner need to show his services, products, testimonials and a contact section with GoogleMaps.

### Built With
* [HTML](https://www.w3.org/html/)
* [CSS](https://www.w3.org/Style/CSS/)
* [Bootstrap](https://getbootstrap.com/)
* [JavaScript](https://www.javascript.com/)
* [ReactJS](https://reactjs.org/)
* [ReduxJS](https://redux.js.org/)
* [Ruby](https://www.ruby-lang.org/en/)
* [RailsAPI](https://rubyonrails.org/)
* [GoogleMaps](https://developers.google.com/maps/documentation)

### Pre-Installation
  1. npm version 6.13.4 or more
  2. node version 8.17.0 or more
  3. ruby version 2.6.5 or more
  4. rails version 6.0.2.1 or more

### Installation
  1. clone the repository [hassana](https://github.com/AnthonyTC89/hassana)
  2. cd in to the folder and run `bundle install`
  3. run `rails db:create && rails db:migrate && rails db:seed`
    * (If there are problems with the service of postgresql check DB Section) 
  4. cd in to /client folder and run `npm install`
  5. return to root folder and run `rails start`
  6. wait until both servers will be initialized
  7. go to [localhost:3000](http://localhost:3000)

### DataBase Setup
  1. Run: `sudo apt-get update && sudo apt-get install postgresql`
  2. Run: `sudo service postgresql start`
  2. Run: `sudo -i -u postgres`
  3. Run: `psql`
  4. Run: `CREATE USER rails with encrypted password 'rails';` (with semicolon)
  5. Run: `ALTER USER rails createdb;` 

### Contact

* **[Anthony Tapia Cossio](https://github.com/AnthonyTC89) - [Linkedin](linkedin.com/in/anthony-tapia-cossio) - [Twitter](https://twitter.com/ptonypTC) - [Portfolio](https://portfolio-anthony.herokuapp.com/)**

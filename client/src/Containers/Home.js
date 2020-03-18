import React from 'react';
import Navbar from '../Components/Navbar';
import Slogan from '../Components/Slogan';
import Promotions from '../Components/Promotions';
import AboutUs from '../Components/AboutUs';
import Services from '../Components/Services';
import Products from '../Components/Products';
import Testimonials from '../Components/Testimonials';
import Contact from '../Components/Contact';
import Footer from '../Components/Footer';

const Home = () => (
  <>
    <header><Navbar /></header>
    <main>
      <Slogan />
      <Promotions />
      <AboutUs />
      <Services />
      <Products />
      <Testimonials />
      <Contact />
    </main>
    <Footer />
  </>
);

export default Home;

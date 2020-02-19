import React from 'react';
import Navbar from '../Components/Navbar';
import Slogan from '../Components/Slogan';
import MainService from '../Components/MainService';
import Services from '../Components/Services';
import Testimonials from '../Components/Testimonials';

const Home = () => (
  <>
    <header><Navbar /></header>
    <main>
      <Slogan />
      <MainService />
      <Services />
      <Testimonials />
    </main>
    <footer>
      Footer
    </footer>
  </>
);

export default Home;

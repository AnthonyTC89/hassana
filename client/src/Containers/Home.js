import React from 'react';
// import Navbar from '../Components/Navbar';
import Slogan from '../Components/Slogan';
import Promotions from '../Components/Promotions';
import AboutUs from '../Components/AboutUs';
import Services from '../Components/Services';
import Products from '../Components/Products';
import Testimonials from '../Components/Testimonials';

const Home = () => (
  <>
    {/* <header><Navbar /></header> */}
    <main>
      <Slogan />
      <Promotions />
      <AboutUs />
      <Services />
      <Products />
      <Testimonials />
    </main>
    {/* <footer>
      Footer
    </footer> */}
  </>
);

export default Home;

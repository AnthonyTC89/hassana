import React from 'react';
import Navbar from '../Components/Navbar';
import Slogan from '../Components/Slogan';
import MainService from '../Components/MainService';

const Home = () => (
  <>
    <header><Navbar /></header>
    <main>
      <Slogan />
      <MainService />
    </main>
    <footer>
      Footer
    </footer>
  </>
);

export default Home;

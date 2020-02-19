import React from 'react';
import Logo from '../Images/logo.jpeg';
import Info from '../PageInfo.json';
import './Slogan.css';

const Slogan = () => (
  <div className="container-slogan">
    <img className="img-logo" src={Logo} alt="logo-hassana" />
    <h3>{Info.slogan}</h3>
  </div>
);

export default Slogan;

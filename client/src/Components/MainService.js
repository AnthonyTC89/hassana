import React from 'react';
import Service from '../Images/silla01.png';
import Info from '../PageInfo.json';
import './MainService.css';

const MainService = () => (
  <div className="container-main">
    <img className="img-main-service bg-hassana" src={Service} alt="service-hassana" />
    <ul>
      {Info.mainService.map((feature) => (
        <li>
          {feature}
        </li>
      ))}
    </ul>
  </div>
);

export default MainService;

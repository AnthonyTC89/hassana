import React from 'react';
import Service from '../Images/silla01.png';
import Info from '../PageInfo.json';
import './MainService.css';

const MainService = () => (
  <div className="container-main">
    <div className="row">
      <img className="col-12 col-sm-6 img-main-service" src={Service} alt="service-hassana" />
      <ul className="col-12 col-sm-6">
        {Info.mainService.map((feature) => (
          <li>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default MainService;

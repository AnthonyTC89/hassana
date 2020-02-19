import React from 'react';
import Info from '../PageInfo.json';
import './Services.css';

const Services = () => (
  <div className="container">
    <div className="row">
      {Info.services.map((service) => (
        <article className="col-12 col-sm-6 col-md-4">
          <img className="img-service" src={service.img} alt="hassana-service" />
          <h4>{service.title}</h4>
          <p>{service.description}</p>
        </article>
      ))}
    </div>
  </div>
);

export default Services;

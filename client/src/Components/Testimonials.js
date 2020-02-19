import React from 'react';
// import Info from '../PageInfo.json';
import './Testimonials.css';
import testimonialImg from '../Images/Testimonial01.jpg';

const Testimonials = () => (
  <div className="container">
    <div className="row">
      <article className="col-12 testimonial">
        <div>
          <img className="img-testimonial" src={testimonialImg} alt="hassana-testimonial" />
        </div>
        <div>
          <p>TESTIMONIO</p>
        </div>
      </article>
      {/* {Info.testimonials.map((testimonial) => (
        <article className="col-12">
          <img className="img-testimonial" src={testimonial.img} alt="hassana-testimonial" />
          <p>{testimonial.description}</p>
        </article>
      ))} */}
    </div>
  </div>
);

export default Testimonials;

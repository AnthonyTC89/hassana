/* eslint-disable react/no-unused-state */
import React from 'react';
import uuidv4 from 'uuid/v4';
import { testimonials } from '../PageInfo.json';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './Testimonials.css';

class Testimonials extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTestimonials: [],
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  // eslint-disable-next-line class-methods-use-this
  async getInfo() {
    this.setState({
      allTestimonials: testimonials,
    });
  }

  render() {
    const { allTestimonials } = this.state;
    return (
      <section className="container">
        <h2>Testimonios</h2>
        {allTestimonials.map((t) => (
          <article key={uuidv4()} className="row testimonial">
            <picture className="col-12 col-sm-6">
              <img className="testimonial-img" src={t.img} alt="hassana-testimonial" />
            </picture>
            <div className="col-12 col-sm-6 testimonial-text">
              <p>{t.description}</p>
            </div>
          </article>
        ))}
      </section>
    );
  }
}

export default Testimonials;

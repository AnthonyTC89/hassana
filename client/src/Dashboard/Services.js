import React from 'react';
import uuidv4 from 'uuid/v4';
import { services } from '../PageInfo.json';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './Services.css';

class Services extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allServices: services,
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  // eslint-disable-next-line class-methods-use-this
  async getInfo() {
    // eslint-disable-next-line no-console
    console.log('getInfo Services');
  }

  render() {
    const { allServices } = this.state;
    return (
      <section className="container services-section" id="services">
        <h2>Servicios</h2>
        {allServices.map((s) => (
          <article key={uuidv4()} className="row service">
            <picture className="col-12 col-sm-6">
              <img className="service-img" src={s.image} alt="hassana-service" />
            </picture>
            <div className="col-12 col-sm-6">
              <h4>{s.title}</h4>
              <p>{s.description}</p>
              <ul className="benefits-list">
                {s.benefits.map((b) => (
                  <li key={uuidv4()}>
                    <small>{b}</small>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>
    );
  }
}

export default Services;

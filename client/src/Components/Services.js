import React from 'react';
import uuidv4 from 'uuid/v4';
import axios from 'axios';
import iconLoading from '../Images/loading.gif';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './Services.css';

class Services extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  async getInfo() {
    this.setState({
      loading: true,
    });
    try {
      const res = await axios.get('/api/full_services');
      this.setState({
        services: res.data,
        loading: false,
      });
    } catch (err) {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { services, loading } = this.state;
    if (services.length === 0) { return null; }
    return (
      <section className="container services-section bg-hassana" id="services">
        <h2>Servicios</h2>
        {loading
          ? <img className="icon-loading" src={iconLoading} alt="icon-loading" />
          : services.map((item) => (
            <article key={uuidv4()} className="row service">
              <picture className="col-12 col-sm-6">
                <img className="service-img" src={item.location} alt="hassana-service" />
              </picture>
              <div className="col-12 col-sm-6">
                <h4>{item.title}</h4>
                <p>{item.text}</p>
                {item.benefits === '' ? null
                  : (
                    <ul className="benefits-list">
                      {item.benefits.split('. ').map((b) => (
                        <li key={uuidv4()} className="list-item">
                          <p>{b}</p>
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
            </article>
          ))}
      </section>
    );
  }
}

export default Services;

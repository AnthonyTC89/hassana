import React from 'react';
import uuidv4 from 'uuid/v4';
import GoogleMaps from './GoogleMaps';
import { contact } from '../PageInfo.json';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './Contact.css';


class Contact extends React.Component {
  constructor(props) {
    super(props);
    const { image, info, map } = contact;
    this.state = {
      image,
      info,
      map,
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  // eslint-disable-next-line class-methods-use-this
  async getInfo() {
    // eslint-disable-next-line no-console
    console.log('getInfo Contact');
  }

  render() {
    const { image, info, map } = this.state;
    const googleMapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.REACT_APP_KEY_API_GOOGLEMAPS}`;
    const containerElement = <div style={{ height: '20rem' }} />;
    const mapElement = <div style={{ height: '100%' }} />;
    const loadingElement = <p>Loading</p>;
    return (
      <section className="container-fluid contact-section">
        <div className="row">
          <picture className="col-12 col-md-4 order-3 order-md-1 contact-picture">
            <img className="contact-img" src={image} alt="hassana-location" />
          </picture>
          <div className="col-12 col-md-4 order-1 order-md-2 contact-text">
            <h2>Contacto</h2>
            {info.map((i) => (
              <div key={uuidv4()}>
                <img className="contact-icon" src={i.icon} alt="hassana-icon" />
                <p>{i.text}</p>
              </div>
            ))}
          </div>
          <div className="col-12 col-md-4 order-2 order-md-3 contact-map">
            <GoogleMaps
              googleMapURL={googleMapURL}
              containerElement={containerElement}
              mapElement={mapElement}
              loadingElement={loadingElement}
              map={map}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default Contact;

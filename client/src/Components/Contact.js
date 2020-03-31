import React from 'react';
import GoogleMaps from './GoogleMaps';
import Info from '../PageInfo.json';
import Icons from '../Icons.json';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './Contact.css';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    const { contactTitle, contactEmail, contactMobile, contactAddress,
      contactRecipe, mapZoom, mapLatitude, mapLongitude } = Info;
    this.state = {
      title: contactTitle,
      recipe: contactRecipe,
      email: contactEmail,
      mobile: contactMobile,
      address: contactAddress,
      map: { zoom: mapZoom, lat: mapLatitude, lng: mapLongitude },
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
    const { title, recipe, email, mobile, address, map } = this.state;
    const googleMapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.REACT_APP_KEY_API_GOOGLEMAPS}`;
    const containerElement = <div style={{ height: '20rem' }} />;
    const mapElement = <div style={{ height: '100%' }} />;
    const loadingElement = <p>Loading</p>;
    return (
      <section className="container-fluid contact-section" id="contact">
        <div className="row">
          <picture className="col-12 col-md-4 order-3 order-md-1 contact-picture">
            <img className="contact-img" src={recipe} alt="hassana-location" />
          </picture>
          <div className="col-12 col-md-4 order-1 order-md-2 contact-text">
            <h2>{title}</h2>
            <div>
              <img className="contact-icon" src={Icons.email} alt="hassana-icon" />
              <p>{email}</p>
            </div>
            <div>
              <img className="contact-icon" src={Icons.mobile} alt="hassana-icon" />
              <p>{mobile}</p>
            </div>
            <div>
              <img className="contact-icon" src={Icons.address} alt="hassana-icon" />
              <p>{address}</p>
            </div>
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

/* eslint-disable camelcase */
import React from 'react';
import axios from 'axios';
import GoogleMaps from './GoogleMaps';
import iconLoading from '../Images/loading.gif';
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
      loading: false,
      message: '',
      title: contactTitle,
      email: contactEmail,
      mobile: contactMobile,
      address: contactAddress,
      recipe: contactRecipe,
      map: { zoom: mapZoom, lat: mapLatitude, lng: mapLongitude },
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  async getInfo() {
    this.setState({
      loading: true,
      message: '',
    });
    try {
      const res = await axios.get('/api/full_contacts');
      const { title, address, mobile, email, zoom, lat, lng,
        recipe_id, location, key } = res.data[0];
      this.setState({
        title,
        address,
        mobile,
        email,
        map: { zoom, lat: parseFloat(lat), lng: parseFloat(lng) },
        recipe: { recipe_id, location, key },
        loading: false,
      });
    } catch (err) {
      this.setState({
        loading: false,
        message: 'Error en el Servidor',
      });
    }
  }

  render() {
    const { title, recipe, email, mobile, address, map, loading, message } = this.state;
    const googleMapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.REACT_APP_KEY_API_GOOGLEMAPS}`;
    const containerElement = <div style={{ height: '100%' }} />;
    const mapElement = <div style={{ height: '100%' }} />;
    const loadingElement = <p>Loading</p>;
    return (
      <section className="container-fluid contact-section bg-hassana" id="contact">
        <p>{message}</p>
        {loading
          ? (
            <picture className="row mx-auto">
              <img className="icon-loading" src={iconLoading} alt="icon-loading" />
            </picture>
          )
          : (
            <div className="row">
              <picture className="col-12 col-md-4 order-3 order-md-1 contact-picture">
                <img className="contact-img" src={recipe.location} alt={recipe.key} />
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
          )}
      </section>
    );
  }
}

export default Contact;

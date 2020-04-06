import React from 'react';
import { navbarTitle } from '../PageInfo.json';
import logoDefault from '../Images/logo.jpeg';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import './Navbar.css';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: navbarTitle,
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  // eslint-disable-next-line class-methods-use-this
  async getInfo() {
    // eslint-disable-next-line no-console
    console.log('getInfo navbar');
  }

  render() {
    const { text } = this.state;
    return (
      <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
        <div className="navbar-elements">
          <a className="navbar-brand" href="#Profile">
            <img className="navbar-logo" src={logoDefault} alt="hassana-logo" />
            <span>{text}</span>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
        </div>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link" href="#home">Home</a>
            <a className="nav-item nav-link" href="#promotions">Promociones</a>
            <a className="nav-item nav-link" href="#aboutUs">Nosotros</a>
            <a className="nav-item nav-link" href="#services">Servicios</a>
            <a className="nav-item nav-link" href="#products">Productos</a>
            <a className="nav-item nav-link" href="#testimonials">Testimonios</a>
            <a className="nav-item nav-link" href="#contact">Contacto</a>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;

import React from 'react';
import LoginModal from './LoginModal';
import logoDefault from '../Images/logo.jpeg';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import './Navbar.css';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      text: 'hassana',
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({
      modalVisible: true,
    });
  }

  closeModal() {
    this.setState({
      modalVisible: false,
    });
  }

  render() {
    const { text, modalVisible } = this.state;
    return (
      <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
        {modalVisible
          ? <LoginModal modalVisible={modalVisible} closeModal={this.closeModal} /> 
          : null}
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
        <button className="btn btn-outline-success" onClick={this.openModal} type="button">Login</button>
      </nav>
    );
  }
}

export default Navbar;

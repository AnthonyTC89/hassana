import React from 'react';
import LoginModal from './LoginModal';
import logoDefault from '../Images/logo.jpeg';
import userIcon from '../Images/user-icon.png';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import './Navbar.css';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      text: 'Hassana',
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
      <nav className="navbar navbar-expand-md fixed-top navbar-light bg-hassana">
        {modalVisible
          ? <LoginModal modalVisible={modalVisible} closeModal={this.closeModal} />
          : null}
        <div className="navbar-elements">
          <div className="d-flex">
            <img className="navbar-logo" src={logoDefault} alt="hassana-logo" />
            <div>
              <a className="navbar-brand" href="#home">{text}</a>
            </div>
          </div>
          <div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <button className="btn btn-user d-md-none" onClick={this.openModal} type="button">
              <img className="btn-image" src={userIcon} alt="user-icon" />
            </button>
          </div>
        </div>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link" href="#aboutUs">Nosotros</a>
            <a className="nav-item nav-link" href="#services">Servicios</a>
            <a className="nav-item nav-link" href="#products">Productos</a>
            <a className="nav-item nav-link" href="#testimonials">Testimonios</a>
            <a className="nav-item nav-link" href="#contact">Contacto</a>
          </div>
        </div>
        <button className="btn btn-user d-none d-md-block" onClick={this.openModal} type="button">
          <img className="btn-image" src={userIcon} alt="user-icon" />
        </button>
      </nav>
    );
  }
}

export default Navbar;

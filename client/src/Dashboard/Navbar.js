import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { navbar } from '../PageInfo.json';
import logout from '../redux/actions/logout';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import './Navbar.css';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    const { logo } = navbar;
    this.state = {
      logo,
    };
    this.logoutSession = this.logoutSession.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  async getInfo() {
    // eslint-disable-next-line no-console
    console.log('getInfo navbar');
  }

  logoutSession() {
    const { closeSession } = this.props;
    closeSession();
  }

  render() {
    const { logo } = this.state;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-elements">
          <a className="navbar-brand" href="#Profile">
            <img className="navbar-logo" src={logo} alt="hassana-logo" />
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
        </div>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav btn-container">
            <button className="btn btn-outline-success" type="button">Home</button>
            <button className="btn btn-outline-success" type="button">Promociones</button>
            <button className="btn btn-outline-success" type="button">Nosotros</button>
            <button className="btn btn-outline-success" type="button">Servicios</button>
            <button className="btn btn-outline-success" type="button">Productos</button>
            <button className="btn btn-outline-success" type="button">Testimonios</button>
            <button className="btn btn-outline-success" type="button">Contacto</button>
            <button
              className="btn btn-outline-danger"
              type="button"
              onClick={this.logoutSession}
            >
              Cerrar Session
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  closeSession: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  closeSession: () => dispatch(logout()),
});

const NavbarWrapper = connect(null, mapDispatchToProps)(Navbar);

export default NavbarWrapper;

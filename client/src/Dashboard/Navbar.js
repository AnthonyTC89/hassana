import React from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import { connect } from 'react-redux';
import { navbarLogo } from '../PageInfo.json';
import logout from '../redux/actions/logout';
import updateDashboard from '../redux/actions/updateDashboard';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import './Navbar.css';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: navbarLogo,
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
    const { changeComponent } = this.props;
    const buttons = [
      { name: 'Information', text: 'Hassana' },
      { name: 'Promotions', text: 'Promociones' },
      { name: 'Services', text: 'Servicios' },
      { name: 'Products', text: 'Productos' },
      { name: 'Testimonials', text: 'Testimonios' },
      { name: 'Images', text: 'Imagenes' },
    ];
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
            {buttons.map((btn) => (
              <button
                key={uuidv4()}
                className="btn btn-outline-primary"
                type="button"
                onClick={() => changeComponent(btn.name)}
              >
                {btn.text}
              </button>
            ))}
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
  changeComponent: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  closeSession: () => dispatch(logout()),
  changeComponent: (component) => dispatch(updateDashboard(component)),
});

const NavbarWrapper = connect(null, mapDispatchToProps)(Navbar);

export default NavbarWrapper;

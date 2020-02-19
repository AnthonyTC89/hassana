import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar navbar-expand-sm bg-hassana">
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <a className="nav-item nav-link" href="#Nosotros">Nosotros</a>
        <a className="nav-item nav-link" href="#Servicios">Servicios</a>
        <a className="nav-item nav-link" href="#Productos">Productos</a>
        <a className="nav-item nav-link" href="#Contacto">Contacto</a>
      </div>
    </div>
    <a className="navbar-brand" href="#Profile">Hassana Masaje &amp; Salud</a>
  </nav>
);

export default Navbar;

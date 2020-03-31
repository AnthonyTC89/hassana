import React from 'react';
import Info from '../PageInfo.json';
import Icons from '../Icons.json';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();
  const copyright = `${year} © AnthonyTC89`;
  const { facebookOfficial } = Icons;
  const { facebook } = Info;
  return (
    <footer className="container-fluid">
      <div className="row">
        <div className="col footer-social">
          <a className="social-link" href={facebook}>
            <img className="social-icon" src={facebookOfficial} alt="facebook-icon" />
          </a>
        </div>
      </div>
      <div className="row">
        <div className="col footer-copyright">
          { copyright }
        </div>
      </div>
    </footer>
  );
};


export default Footer;

import React from 'react';
import uuidv4 from 'uuid/v4';
import { slogan } from '../PageInfo.json';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();
  const copyright = `${year} © AnthonyTC89`;
  const { social } = slogan;
  return (
    <footer className="container-fluid">
      <div className="row">
        <div className="col footer-social">
          {social.map((s) => (
            <a key={uuidv4()} className="social-link" href={s.pageLink}>
              <img className="social-icon" src={s.iconLink} alt={`${s.name}-icon`} />
            </a>
          ))}
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

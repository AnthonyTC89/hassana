import React from 'react';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import iconLoading from '../Images/loading.gif';
import './Footer.css';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socialNetworks: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getSocialNetworks();
  }

  async getSocialNetworks() {
    this.setState({
      loading: true,
    });
    try {
      const res = await axios.get('/api/social_networks');
      this.setState({
        socialNetworks: res.data,
        loading: false,
      });
    } catch (err) {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { socialNetworks, loading } = this.state;
    const year = new Date().getFullYear();
    const copyright = `${year} © AnthonyTC89. All Rights Reserved.`;
    return (
      <footer className="container-fluid footer-section">
        {loading
          ? (
            <picture className="row mx-auto">
              <img className="icon-loading" src={iconLoading} alt="icon-loading" />
            </picture>
          ) : (
            <div className="row social-list">
              {socialNetworks.map((item) => (
                <a
                  key={uuidv4()}
                  className="social-link"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img className="social-icon" src={item.src} alt={`${item.name}-icon`} />
                </a>
              ))}
            </div>
          )}
        <div className="row footer-copyright">
          <p>{copyright}</p>
        </div>
      </footer>
    );
  }
}

export default Footer;

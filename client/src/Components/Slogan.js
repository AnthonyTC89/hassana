import React from 'react';
import uuidv4 from 'uuid/v4';
import axios from 'axios';
import Info from '../PageInfo.json';
import iconLoading from '../Images/pre-loader.gif';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './Slogan.css';

class Slogan extends React.Component {
  constructor(props) {
    super(props);
    const { headerTitle, headerText, headerRecipe } = Info;
    this.state = {
      socialNetworks: [],
      loading: false,
      headerTitle,
      headerText,
      headerRecipe,
    };
  }

  componentDidMount() {
    this.getSocialNetworks();
  }

  // eslint-disable-next-line class-methods-use-this
  async getSocialNetworks() {
    this.setState({
      loading: true,
      message: '',
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
        message: 'Error en el Servidor',
      });
    }
  }

  render() {
    const { headerTitle, headerText, headerRecipe,
      socialNetworks, loading, message } = this.state;
    return (
      <section className="container-fluid slogan-section" id="home">
        {loading
          ? <img className="icon-loading" src={iconLoading} alt="icon-loading" />
          : null}
        <div className="row">
          <picture className="col-12 col-sm-6">
            <img className="slogan-image" src={headerRecipe} alt="hassana-masajes-salud" />
          </picture>
          <div className="col-12 col-sm-6 slogan-info">
            <h1>{headerTitle}</h1>
            <h3>{headerText}</h3>
            <div className="social-list">
              <small>{message}</small>
              {socialNetworks.map((item) => {
                if (item.status === 0) { return null; }
                return (
                  <a key={uuidv4()} className="social-link" href={item.href}>
                    <img className="social-icon" src={item.src} alt={`${item.name}-icon`} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Slogan;

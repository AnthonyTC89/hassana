/* eslint-disable camelcase */
import React from 'react';
import uuidv4 from 'uuid/v4';
import axios from 'axios';
import Info from '../PageInfo.json';
import iconLoading from '../Images/loading.gif';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './Slogan.css';

class Slogan extends React.Component {
  constructor(props) {
    super(props);
    const { headerTitle, headerText } = Info;
    this.state = {
      socialNetworks: [],
      loading: false,
      message: '',
      title: headerTitle,
      text: headerText,
      recipe: { location: 'https://picsum.photos/800', key: 'default' },
    };
  }

  componentDidMount() {
    this.getSlogan();
    this.getSocialNetworks();
  }

  async getSlogan() {
    this.setState({
      loading: true,
      message: '',
    });
    try {
      const res = await axios.get('/api/full_headers');
      const { title, text, recipe_id, location, key } = res.data[0];
      this.setState({
        title,
        text,
        recipe: { recipe_id, location, key },
        loading: false,
      });
    } catch (err) {
      this.setState({
        loading: false,
        message: 'Error en el Servidor',
      });
    }
  }

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
    const { title, text, recipe, socialNetworks, loading, message } = this.state;
    return (
      <section className="container-fluid slogan-section" id="home">
        {loading
          ? (
            <picture className="row mx-auto">
              <img className="icon-loading" src={iconLoading} alt="icon-loading" />
            </picture>
          )
          : (
            <div className="row">
              <picture className="col-12 col-sm-6">
                <img className="slogan-image" src={recipe.location} alt={recipe.key} />
              </picture>
              <div className="col-12 col-sm-6 slogan-info">
                <h1>{title}</h1>
                <h3>{text}</h3>
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
          )}
      </section>
    );
  }
}

export default Slogan;

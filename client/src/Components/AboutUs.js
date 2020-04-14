/* eslint-disable camelcase */
import React from 'react';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import iconLoading from '../Images/loading.gif';
import Info from '../PageInfo.json';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './AboutUs.css';

class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    const { aboutTitle, aboutText, aboutRecipe } = Info;
    this.state = {
      socialNetworks: [],
      loading: false,
      message: '',
      title: aboutTitle,
      text: aboutText,
      recipe: aboutRecipe,
    };
  }

  componentDidMount() {
    this.getInfo();
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

  async getInfo() {
    this.setState({
      loading: true,
      message: '',
    });
    try {
      const res = await axios.get('/api/full_abouts');
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

  render() {
    const { title, text, recipe, loading, message, socialNetworks } = this.state;
    const social = socialNetworks.filter((sn) => sn.status);
    return (
      <section className="container-fluid about-section" id="aboutUs">
        <h2>{title}</h2>
        <p>{message}</p>
        {loading
          ? (
            <picture className="row mx-auto">
              <img className="icon-loading" src={iconLoading} alt="icon-loading" />
            </picture>
          )
          : (
            <div className="row">
              <article className="col-12 col-sm-6 about-text">
                <h6>{text}</h6>
                <div className="social-list">
                  {social.map((item) => (
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
              </article>
              <picture className="col-12 col-sm-6 about-picture">
                <img className="about-image" src={recipe.location} alt={recipe.key} />
              </picture>
            </div>
          )}
      </section>
    );
  }
}

export default AboutUs;

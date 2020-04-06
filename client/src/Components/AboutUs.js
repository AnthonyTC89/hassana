/* eslint-disable camelcase */
import React from 'react';
import axios from 'axios';
import iconLoading from '../Images/loading.gif';
import Info from '../PageInfo.json';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './AboutUs.css';

class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    const { aboutTitle, aboutText, aboutRecipe } = Info;
    this.state = {
      loading: false,
      message: '',
      title: aboutTitle,
      text: aboutText,
      recipe: aboutRecipe,
    };
  }

  componentDidMount() {
    this.getInfo();
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
    const { title, text, recipe, loading, message } = this.state;
    return (
      <section className="container-fluid about-section" id="aboutUs">
        <h2>{title}</h2>
        <p>{message}</p>
        {loading
          ? <img src={iconLoading} alt="icon-loading" />
          : (
            <div className="row">
              <article className="col-12 col-sm-6 about-text">
                <p>{text}</p>
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

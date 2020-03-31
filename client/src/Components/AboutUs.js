import React from 'react';
import Info from '../PageInfo.json';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './AboutUs.css';

class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    const { aboutTitle, aboutText, aboutRecipe } = Info;
    this.state = {
      title: aboutTitle,
      text: aboutText,
      recipe: aboutRecipe,
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  // eslint-disable-next-line class-methods-use-this
  async getInfo() {
    // eslint-disable-next-line no-console
    console.log('getInfo AboutUs');
  }

  render() {
    const { title, text, recipe } = this.state;
    return (
      <section className="container-fluid about-section" id="aboutUs">
        <h2>{title}</h2>
        <div className="row">
          <article className="col-12 col-sm-6 about-text">
            <p>{text}</p>
          </article>
          <picture className="col-12 col-sm-6 about-picture">
            <img className="about-image" src={recipe} alt="hassana-salud" />
          </picture>
        </div>
      </section>
    );
  }
}

export default AboutUs;

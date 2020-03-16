import React from 'react';
import { aboutUs } from '../PageInfo.json';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './AboutUs.css';

class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    const { title, text, image } = aboutUs;
    this.state = {
      title,
      text,
      image,
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
    const { title, text, image } = this.state;
    return (
      <section className="container-fluid about-section">
        <h2>{title}</h2>
        <div className="row">
          <article className="col-12 col-sm-6 about-text">
            <p>{text}</p>
          </article>
          <picture className="col-12 col-sm-6 about-picture">
            <img className="about-image" src={image.src} alt={`${image.name}`} />
          </picture>
        </div>
      </section>
    );
  }
}

export default AboutUs;

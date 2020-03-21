import React from 'react';
import { aboutUs } from '../PageInfo.json';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './AboutUs.css';

class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    const { title, text, image } = aboutUs;
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      title, text, image,
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
    return (
      <section className="container">
        <h2>AboutUs</h2>
      </section>
    );
  }
}

export default AboutUs;

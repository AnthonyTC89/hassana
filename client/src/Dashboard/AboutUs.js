import React from 'react';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './AboutUs.css';

class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      title: '',
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

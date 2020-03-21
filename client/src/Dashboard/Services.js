import React from 'react';
// import uuidv4 from 'uuid/v4';
import { services } from '../PageInfo.json';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './Services.css';

class Services extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      allServices: services,
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  // eslint-disable-next-line class-methods-use-this
  async getInfo() {
    // eslint-disable-next-line no-console
    console.log('getInfo Services');
  }

  render() {
    return (
      <section className="container">
        <h2>Servicios</h2>
      </section>
    );
  }
}

export default Services;

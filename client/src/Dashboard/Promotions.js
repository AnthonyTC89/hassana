import React from 'react';
// import uuidv4 from 'uuid/v4';
import { promotions } from '../PageInfo.json';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './Promotions.css';

class Promotions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      promos: promotions,
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  // eslint-disable-next-line class-methods-use-this
  async getInfo() {
    // eslint-disable-next-line no-console
    console.log('getInfo promotions');
  }

  render() {
    return (
      <section className="container">
        <h2>Promociones</h2>
      </section>
    );
  }
}

export default Promotions;

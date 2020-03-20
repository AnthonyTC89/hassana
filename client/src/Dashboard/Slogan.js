/* eslint-disable react/no-unused-state */
import React from 'react';
// import uuidv4 from 'uuid/v4';
// import { slogan } from '../PageInfo.json';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './Slogan.css';

class Slogan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slogan: [],
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  // eslint-disable-next-line class-methods-use-this
  async getInfo() {
    this.setState({
      slogan: '',
    });
  }

  render() {
    // const { allTestimonials } = this.state;
    return (
      <section className="container">
        <h2>Slogan</h2>
      </section>
    );
  }
}

export default Slogan;

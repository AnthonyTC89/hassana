import React from 'react';
// import uuidv4 from 'uuid/v4';
import { contact } from '../PageInfo.json';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './Contact.css';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    const { image, info, map } = contact;
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      image, info, map,
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  // eslint-disable-next-line class-methods-use-this
  async getInfo() {
    // eslint-disable-next-line no-console
    console.log('getInfo Contact');
  }

  render() {
    return (
      <section className="container">
        <h2>Contacto</h2>
      </section>
    );
  }
}

export default Contact;

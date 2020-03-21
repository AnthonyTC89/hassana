import React from 'react';
// import uuidv4 from 'uuid/v4';
import { products } from '../PageInfo.json';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './Products.css';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      allProducts: products,
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  // eslint-disable-next-line class-methods-use-this
  async getInfo() {
    // eslint-disable-next-line no-console
    console.log('getInfo Products');
  }

  render() {
    return (
      <section className="container">
        <h2>Productos</h2>
      </section>
    );
  }
}

export default Products;

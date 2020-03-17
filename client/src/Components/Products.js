import React from 'react';
import uuidv4 from 'uuid/v4';
import { products } from '../PageInfo.json';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './Products.css';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const { allProducts } = this.state;
    return (
      <section className="container-fluid products-section">
        <h2>Productos</h2>
        <div className="row">
          {allProducts.map((p) => (
            <article key={uuidv4()} className="col product">
              <img className="product-img" src={p.image} alt="hassana-product" />
              <h4>{p.title}</h4>
              <p>{p.description}</p>
              <ul className="benefits-list">
                {p.benefits.map((b) => (
                  <li key={uuidv4()}>
                    <small>{b}</small>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    );
  }
}

export default Products;

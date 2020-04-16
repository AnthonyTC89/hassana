import React from 'react';
import uuidv4 from 'uuid/v4';
import axios from 'axios';
import iconLoading from '../Images/loading.gif';
import './Products.css';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  async getInfo() {
    this.setState({
      loading: true,
    });
    try {
      const res = await axios.get('/api/full_products');
      this.setState({
        products: res.data,
        loading: false,
      });
    } catch (err) {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { products, loading } = this.state;
    if (products.length === 0) { return null; }
    return (
      <section className="container-fluid products-section bg-hassana" id="products">
        <h2>Productos</h2>
        {loading
          ? <img className="icon-loading" src={iconLoading} alt="icon-loading" />
          : (
            <div className="row">
              {products.map((item) => (
                <article key={uuidv4()} className="col product">
                  <img className="product-img" src={item.location} alt={item.key} />
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                  {item.benefits === '' ? null
                    : (
                      <ul className="benefits-list">
                        {item.benefits.split('. ').map((b) => (
                          <li key={uuidv4()} className="list-item">
                            <p>{b}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                </article>
              ))}
            </div>
          )}
      </section>
    );
  }
}

export default Products;

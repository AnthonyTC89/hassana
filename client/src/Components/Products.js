import React from 'react';
import uuidv4 from 'uuid/v4';
import axios from 'axios';
import BenefitsModal from './BenefitsModal';
import iconLoading from '../Images/loading.gif';
import './Products.css';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: false,
      modalVisible: false,
      productSelected: null,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  openModal(productSelected) {
    this.setState({
      modalVisible: true,
      productSelected,
    });
  }

  closeModal() {
    this.setState({
      modalVisible: false,
    });
  }

  render() {
    const { products, loading, modalVisible, productSelected } = this.state;
    if (products.length === 0) { return null; }
    return (
      <section className="container products-section bg-hassana" id="products">
        <h2>Productos</h2>
        {modalVisible
          ? (
            <BenefitsModal
              item={productSelected}
              modalVisible={modalVisible}
              closeModal={this.closeModal}
            />
          )
          : null}
        {loading
          ? (
            <picture className="row mx-auto">
              <img className="icon-loading" src={iconLoading} alt="icon-loading" />
            </picture>
          ) : (
            <div className="row">
              {products.map((item) => (
                <article key={uuidv4()} className="col-12 col-sm-6 col-md-4 product">
                  <picture className="product-picture">
                    <img className="product-img" src={item.location} alt={item.key} />
                  </picture>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                  {item.benefits === ''
                    ? null
                    : (
                      <button
                        className="btn btn-success"
                        type="button"
                        onClick={() => this.openModal(item)}
                      >
                        Beneficios
                      </button>
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

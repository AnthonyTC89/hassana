import React from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import axios from 'axios';
import { connect } from 'react-redux';
import RecipesModal from './RecipesModal';
import iconLoading from '../Images/loading.gif';
import 'bootstrap/dist/css/bootstrap.css';
import './Products.css';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: false,
      formVisible: false,
      imgSelected: false,
      modalVisible: false,
      message: '',
      id: null, // used in edit Products
      title: '',
      text: '',
      benefits: '',
      status: true,
      recipe: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.showForm = this.showForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChangeCheckBox = this.handleChangeCheckBox.bind(this);
  }

  componentDidMount() {
    this.getInfo();
  }

  async getInfo() {
    this.setState({
      loading: true,
      message: '',
    });
    try {
      const res = await axios.get('/api/full_products');
      this.setState({
        products: res.data,
        loading: false,
        formVisible: res.data.length === 0,
      });
    } catch (err) {
      this.setState({
        loading: false,
        message: 'Error en el Servidor',
      });
    }
  }

  openModal() {
    this.setState({
      modalVisible: true,
    });
  }

  closeModal(recipe) {
    this.setState({
      modalVisible: false,
      imgSelected: recipe !== null,
      recipe,
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleChangeCheckBox(e) {
    this.setState({
      status: e.target.checked,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { id, title, text, benefits, recipe, status, products } = this.state;
    if (recipe === null) {
      this.setState({
        message: 'Seleccione una imagen',
      });
      return;
    }
    try {
      const data = { title, text, benefits, status, recipe_id: recipe.id };
      const res = id !== null
        ? await axios.put(`api/products/${id}`, data)
        : await axios.post('api/products', data);

      const newProduct = {
        id: res.data.id,
        title,
        text,
        benefits,
        status,
        recipe_id: recipe.id,
        location: recipe.location,
        key: recipe.key,
      };
      if (res.status === 201) { // Created
        this.setState((prevState) => ({
          message: 'Producto creado exitosamente',
          products: [newProduct, ...prevState.products],
          formVisible: false,
        }));
      }
      if (res.status === 200) { // OK - Updated
        const auxProducts = products.filter((i) => i.id !== id);
        this.setState({
          message: 'Producto actualizado exitosamente',
          products: [newProduct, ...auxProducts],
          formVisible: false,
        });
      }
    } catch (err) {
      this.setState({
        message: 'error',
      });
    }
  }

  async handleDelete(item) {
    this.setState({
      message: '',
      loading: true,
    });
    try {
      await axios.delete(`api/products/${item.id}`);
      this.setState((prevState) => ({
        message: 'Producto eliminado.',
        products: prevState.products.filter((i) => i.id !== item.id),
        loading: false,
      }));
    } catch (err) {
      this.setState({
        message: 'error',
        loading: false,
      });
    }
  }

  showForm(item) {
    this.setState({
      id: item === null ? null : item.id,
      title: item === null ? '' : item.title,
      text: item === null ? '' : item.text,
      benefits: item === null ? '' : item.benefits,
      status: item === null ? true : item.status,
      recipe: item === null ? null : { id: item.recipe_id, location: item.location, key: item.key },
      imgSelected: item !== null,
      formVisible: true,
      message: '',
    });
  }

  closeForm() {
    this.setState({
      formVisible: false,
    });
  }

  render() {
    const { products, loading, formVisible, message, modalVisible,
      title, text, benefits, status, recipe, imgSelected } = this.state;
    const { recipes } = this.props;
    const header = `Productos (${products.length})`;
    return (
      <div className="container">
        {modalVisible
          ? (
            <RecipesModal
              recipes={recipes}
              modalVisible={modalVisible}
              closeModal={this.closeModal}
            />
          )
          : null}
        <h2>{header}</h2>
        <button
          className="btn btn-primary"
          type="button"
          onClick={formVisible ? this.closeForm : () => this.showForm(null)}
        >
          {formVisible ? 'Ver Productos' : 'Nuevo Producto'}
        </button>
        <p>{message}</p>
        {loading
          ? <img className="icon-loading" src={iconLoading} alt="icon-loading" />
          : null}
        {formVisible
          ? (
            <div className="row">
              <picture className="col-12 col-sm-6 picture-selection">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={this.openModal}
                >
                  Seleccione una imagen
                </button>
                {imgSelected
                  ? <img className="image-selected" src={recipe.location} alt={recipe.key} />
                  : null}
              </picture>
              <form onSubmit={this.handleSubmit} className="col-12 col-sm-6 input-form">
                <input
                  className="form-control"
                  onChange={this.handleChange}
                  placeholder="Ingrese el titulo aqui"
                  name="title"
                  value={title}
                  required
                />
                <textarea
                  className="form-control textarea-form"
                  onChange={this.handleChange}
                  placeholder="Ingrese el texto aqui"
                  name="text"
                  value={text}
                  rows="7"
                  required
                />
                <textarea
                  className="form-control textarea-form"
                  onChange={this.handleChange}
                  placeholder="Beneficios aqui"
                  name="benefits"
                  value={benefits}
                  rows="7"
                />
                <div>
                  <input
                    id="chk-status"
                    type="checkbox"
                    className="form-check-input"
                    checked={status}
                    onChange={this.handleChangeCheckBox}
                  />
                  <label className="form-check-label" htmlFor="chk-status">Activo</label>
                </div>
                <button type="submit" className="btn btn-success">Guardar</button>
              </form>
            </div>
          )
          : products.map((item) => (
            <article key={uuidv4()} className="row">
              <div className="col-12">
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={() => this.showForm(item)}
                >
                  Editar
                </button>
              </div>
              <picture className="col-12 col-sm-6 item-picture">
                <img className="item-image" src={item.location} alt={item.key} />
              </picture>
              <div className="col-12 col-sm-6 item-text">
                <h3>{item.title}</h3>
                <div>
                  <p className={item.status ? '' : 'text-line-through'}>{item.text}</p>
                  <h6>Beneficios</h6>
                  <ul>
                    {item.benefits.split('. ').map((b) => (
                      <li key={uuidv4()} className="list-item">
                        <p>{b}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-12">
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => this.handleDelete(item)}
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}
      </div>
    );
  }
}

Products.propTypes = {
  recipes: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  recipes: state.recipes,
});

const ProductsWrapper = connect(mapStateToProps, null)(Products);

export default ProductsWrapper;

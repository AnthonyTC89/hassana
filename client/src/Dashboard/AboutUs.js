/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import RecipesModal from './RecipesModal';
import iconLoading from '../Images/loading.gif';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './Products.css';

class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      modalVisible: false,
      message: '',
      id: null,
      title: '',
      text: '',
      recipe: { location: 'https://picsum.photos/800', key: 'default' },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
      const res = await axios.get('/api/full_abouts');
      const { id, title, text, recipe_id, location, key } = res.data[0];
      this.setState({
        id,
        title,
        text,
        recipe: { recipe_id, location, key },
        loading: false,
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

  closeModal(newRecipe) {
    const { recipe } = this.state;
    this.setState({
      modalVisible: false,
      recipe: newRecipe === null ? recipe : newRecipe,
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { id, title, text, recipe } = this.state;
    if (recipe === null) {
      this.setState({
        message: 'Seleccione una imagen',
      });
      return;
    }
    try {
      const data = { title, text, recipe_id: recipe.id };
      const res = await axios.put(`api/abouts/${id}`, data);
      if (res.status === 200) { // OK - Updated
        this.setState({
          message: 'Informacion actualizada exitosamente',
        });
      }
    } catch (err) {
      this.setState({
        message: 'Error al actualizar',
      });
    }
  }

  render() {
    const { loading, message, modalVisible,
      title, text, recipe } = this.state;
    const { recipes } = this.props;
    const header = 'Acerca de Hassana';
    return (
      <div className="container">
        <RecipesModal recipes={recipes} modalVisible={modalVisible} closeModal={this.closeModal} />
        <h2>{header}</h2>
        <p>{message}</p>
        {loading
          ? <img className="icon-loading" src={iconLoading} alt="icon-loading" />
          : null}
        <div className="row">
          <picture className="col-12 col-sm-6 picture-selection">
            <button
              type="button"
              className="btn btn-success"
              onClick={this.openModal}
            >
              Seleccione una imagen
            </button>
            <img className="image-selected" src={recipe.location} alt={recipe.key} />
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
            <button type="submit" className="btn btn-success">
              Guardar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

AboutUs.propTypes = {
  recipes: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  recipes: state.recipes,
});

const AboutUsWrapper = connect(mapStateToProps, null)(AboutUs);

export default AboutUsWrapper;

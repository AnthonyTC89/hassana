import React from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import axios from 'axios';
import { connect } from 'react-redux';
import RecipesModal from './RecipesModal';
import iconLoading from '../Images/pre-loader.gif';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './Promotions.css';

class Promotions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promotions: [],
      loading: false,
      formVisible: false,
      imgSelected: false,
      modalVisible: false,
      message: '',
      id: null, // used in edit Testimonial
      title: '',
      text: '',
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
    });
    try {
      const promotions = await axios.get('/api/full_promotions');
      this.setState({
        promotions: promotions.data,
        loading: false,
        formVisible: promotions.data.length === 0,
      });
    } catch (err) {
      this.setState({
        loading: false,
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
    const { id, title, text, recipe, status, promotions } = this.state;
    try {
      const res = id !== null
        ? await axios.put(`api/promotions/${id}`, { title, text, status, recipe_id: recipe.id })
        : await axios.post('api/promotions', { title, text, status, recipe_id: recipe.id });

      const newPromotion = {
        id: res.data.id,
        title,
        text,
        status,
        recipe_id: recipe.id,
        location: recipe.location,
        key: recipe.key,
      };
      if (res.status === 201) { // Created
        this.setState((prevState) => ({
          message: 'Promocion creada exitosamente',
          promotions: [newPromotion, ...prevState.promotions],
          formVisible: false,
        }));
      }
      if (res.status === 200) { // OK - Updated
        const auxPromotions = promotions.filter((i) => i.id !== id);
        this.setState({
          message: 'Promocion actualizada exitosamente',
          promotions: [newPromotion, ...auxPromotions],
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
    try {
      await axios.delete(`api/promotions/${item.id}`);
      this.setState((prevState) => ({
        message: 'Promocion borrada.',
        promotions: prevState.promotions.filter((i) => i.id !== item.id),
      }));
    } catch (err) {
      this.setState({
        message: 'error',
      });
    }
  }

  showForm(item) {
    this.setState({
      id: item === null ? null : item.id,
      title: item === null ? '' : item.title,
      text: item === null ? '' : item.text,
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
    const { promotions, loading, formVisible, message,
      title, text, status, recipe, imgSelected, modalVisible } = this.state;
    const { recipes } = this.props;
    return (
      <section className="container">
        <RecipesModal recipes={recipes} modalVisible={modalVisible} closeModal={this.closeModal} />
        <h2>Promociones</h2>
        <button
          className="btn btn-primary"
          type="button"
          onClick={formVisible ? this.closeForm : () => this.showForm(null)}
        >
          {formVisible ? 'Ver Promociones' : 'Nueva Promocion'}
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
                  className="form-control input-form"
                  onChange={this.handleChange}
                  placeholder="Ingrese el titulo aqui"
                  name="title"
                  value={title}
                />
                <textarea
                  className="form-control textarea-form"
                  onChange={this.handleChange}
                  placeholder="Ingrese el texto aqui"
                  name="text"
                  value={text}
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
          : promotions.map((item) => (
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
                <img src={item.location} alt={item.key} />
              </picture>
              <div className="col-12 col-sm-6">
                <p>{item.title}</p>
                <p className={item.status ? '' : 'text-line-through'}>{item.text}</p>
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
      </section>
    );
  }
}

Promotions.propTypes = {
  recipes: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  recipes: state.recipes,
});

const PromotionsWrapper = connect(mapStateToProps, null)(Promotions);

export default PromotionsWrapper;

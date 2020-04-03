import React from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import axios from 'axios';
import { connect } from 'react-redux';
import RecipesModal from './RecipesModal';
import iconLoading from '../Images/pre-loader.gif';
import 'bootstrap/dist/css/bootstrap.css';
import './Testimonials.css';


class Testimonials extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testimonials: [],
      loading: false,
      formVisible: false,
      imgSelected: false,
      modalVisible: false,
      message: '',
      id: null, // used in edit Testimonial
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
      message: '',
    });
    try {
      const testimonials = await axios.get('/api/full_testimonials');
      this.setState({
        testimonials: testimonials.data,
        loading: false,
        formVisible: testimonials.data.length === 0,
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
    const { id, text, recipe, status, testimonials } = this.state;
    if (recipe === null) {
      this.setState({
        message: 'Seleccione una imagen',
      });
      return;
    }
    try {
      const data = { text, status, recipe_id: recipe.id };
      const res = id !== null
        ? await axios.put(`api/testimonials/${id}`, data)
        : await axios.post('api/testimonials', data);

      const newTestimonial = {
        id: res.data.id,
        text,
        status,
        recipe_id: recipe.id,
        location: recipe.location,
        key: recipe.key,
      };
      if (res.status === 201) { // Created
        this.setState((prevState) => ({
          message: 'Testimonio creado exitosamente',
          testimonials: [newTestimonial, ...prevState.testimonials],
          formVisible: false,
        }));
      }
      if (res.status === 200) { // OK - Updated
        const auxTestimonials = testimonials.filter((i) => i.id !== id);
        this.setState({
          message: 'Testimonio actualizado exitosamente',
          testimonials: [newTestimonial, ...auxTestimonials],
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
      await axios.delete(`api/testimonials/${item.id}`);
      this.setState((prevState) => ({
        message: 'Testimonio borrado.',
        testimonials: prevState.testimonials.filter((i) => i.id !== item.id),
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
    const { testimonials, loading, formVisible, message, status,
      text, imgSelected, recipe, modalVisible } = this.state;
    const { recipes } = this.props;
    const header = `Testimonios (${testimonials.length})`;
    return (
      <section className="container">
        <RecipesModal recipes={recipes} modalVisible={modalVisible} closeModal={this.closeModal} />
        <h2>{header}</h2>
        <button
          className="btn btn-primary"
          type="button"
          onClick={formVisible ? this.closeForm : () => this.showForm(null)}
        >
          {formVisible ? 'Ver Testimonios' : 'Nuevo Testimonio'}
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
                <textarea
                  className="form-control textarea-form"
                  onChange={this.handleChange}
                  placeholder="Ingrese el texto aqui"
                  name="text"
                  value={text}
                  rows="7"
                  required
                />
                <div className="form-check">
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
          : testimonials.map((t) => (
            <article key={uuidv4()} className="row">
              <div className="col-12">
                <button className="btn btn-success" type="button" onClick={() => this.showForm(t)}>Editar</button>
              </div>
              <picture className="col-12 col-sm-6 item-picture">
                <img src={t.location} alt={t.key} />
              </picture>
              <div className="col-12 col-sm-6">
                <p className={t.status ? '' : 'text-line-through'}>{t.text}</p>
              </div>
              <div className="col-12">
                <button className="btn btn-danger" type="button" onClick={() => this.handleDelete(t)}>Eliminar</button>
              </div>
            </article>
          ))}
      </section>
    );
  }
}

Testimonials.propTypes = {
  recipes: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  recipes: state.recipes,
});

const TestimonialsWrapper = connect(mapStateToProps, null)(Testimonials);

export default TestimonialsWrapper;

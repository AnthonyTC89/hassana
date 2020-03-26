import React from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import axios from 'axios';
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
      image: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.showForm = this.showForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
  }

  componentDidMount() {
    this.getInfo();
  }

  async getInfo() {
    this.setState({
      loading: true,
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
      });
    }
  }

  openModal() {
    this.setState({
      modalVisible: true,
    });
  }

  closeModal(image) {
    this.setState({
      modalVisible: false,
      imgSelected: image !== null,
      image,
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { id, text, image } = this.state;
    try {
      if (id !== null) {
        await axios.put(`api/testimonials/${id}`, { text, recipe_id: image.id });
      } else {
        await axios.post('api/testimonials', { text, recipe_id: image.id });
      }
      this.setState({
        message: 'accion exitosa',
      });
    } catch (err) {
      this.setState({
        message: 'error',
      });
    }
  }

  showForm(t) {
    this.setState({
      id: t === null ? null : t.id,
      text: t === null ? '' : t.text,
      image: t === null ? null : { id: t.recipe_id, bucket: t.bucket, location: t.location },
      imgSelected: t !== null,
      formVisible: true,
    });
  }

  closeForm() {
    this.setState({
      formVisible: false,
    });
  }

  render() {
    const { testimonials, loading, formVisible, message,
      text, imgSelected, image, modalVisible } = this.state;
    const { recipes } = this.props;
    return (
      <section className="container">
        <RecipesModal recipes={recipes} modalVisible={modalVisible} closeModal={this.closeModal} />
        <h2>Testimonios</h2>
        <button
          className="btn btn-primary"
          type="button"
          onClick={formVisible ? this.closeForm : () => this.showForm(null)}
        >
          {formVisible ? 'Ver Testimonios' : 'Nuevo Testimonio'}
        </button>
        {message}
        {loading
          ? <img className="icon-loading" src={iconLoading} alt="icon-loading" />
          : null}
        {formVisible
          ? (
            <div className="row">
              <picture className="col-12 col-sm-6 testimonial-img-selected">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={this.openModal}
                >
                  Seleccione una imagen
                </button>
                {imgSelected
                  ? <img className="testimonial-image" src={image.location} alt="testimonial-selected" />
                  : null}
              </picture>
              <form onSubmit={this.handleSubmit} className="col-12 col-sm-6 testimonial-form">
                <textarea
                  className="form-control testimonial-area"
                  onChange={this.handleChange}
                  placeholder="Ingrese el texto aqui"
                  name="text"
                  value={text}
                  rows="7"
                />
                <button type="submit" className="btn btn-success">Guardar</button>
              </form>
            </div>
          )
          : testimonials.map((t) => (
            <article key={uuidv4()} className="row testimonial">
              <div className="col-12">
                <button className="btn btn-success" type="button" onClick={() => this.showForm(t)}>Editar</button>
              </div>
              <picture className="col-12 col-sm-6 testimonial-picture">
                <img className="testimonial-img" src={t.location} alt={t.key} />
              </picture>
              <div className="col-12 col-sm-6 testimonial-text">
                <p>{t.text}</p>
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

export default Testimonials;

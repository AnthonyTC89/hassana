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
      showNewForm: false,
      text: '',
      imgSelected: false,
      image: null,
      modalVisible: false,
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
    });
    try {
      const testimonials = await axios.get('/api/testimonials');
      this.setState({
        testimonials: testimonials.data,
        loading: false,
        showNewForm: testimonials.data.length === 0,
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

  // eslint-disable-next-line class-methods-use-this
  async handleSubmit(e) {
    e.preventDefault();
    const { text, image } = this.state;
    try {
      await axios.put('api/testimonials', { text, recipe: image.id });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { testimonials, loading, showNewForm,
      testimonial, imgSelected, image, modalVisible } = this.state;
    const { recipes } = this.props;
    return (
      <section className="container">
        <RecipesModal recipes={recipes} modalVisible={modalVisible} closeModal={this.closeModal} />
        <h2>Testimonios</h2>
        {loading
          ? <img className="icon-loading" src={iconLoading} alt="icon-loading" />
          : null}
        {showNewForm
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
                  name="testimonial"
                  value={testimonial}
                  rows="7"
                />
                <button type="submit" className="btn btn-success">Guardar</button>
              </form>
            </div>
          )
          : testimonials.map((t) => (
            <article key={uuidv4()} className="row testimonial">
              <picture className="col-12 col-sm-6">
                <img className="testimonial-img" src={t.img} alt="hassana-testimonial" />
              </picture>
              <div className="col-12 col-sm-6 testimonial-text">
                <p>{t.description}</p>
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

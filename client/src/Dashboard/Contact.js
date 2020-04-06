/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import RecipesModal from './RecipesModal';
import iconLoading from '../Images/loading.gif';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './Contact.css';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      modalVisible: false,
      message: '',
      id: null,
      title: '',
      email: '',
      mobile: '',
      address: '',
      zoom: 15,
      lat: -16.4360,
      lng: -71.52605,
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
      const res = await axios.get('/api/full_contacts');
      const { id, title, address, mobile, email, zoom, lat, lng,
        recipe_id, location, key } = res.data[0];
      this.setState({
        id,
        title,
        address,
        mobile,
        email,
        zoom,
        lat,
        lng,
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
    const { id, title, email, address, mobile, zoom, lat, lng, recipe } = this.state;
    if (recipe === null) {
      this.setState({
        message: 'Seleccione una imagen',
      });
      return;
    }
    try {
      // eslint-disable-next-line object-property-newline
      const data = { title, email, address, mobile, zoom, lat, lng,
        recipe_id: recipe.id };
      const res = await axios.put(`api/contacts/${id}`, data);
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
    const { loading, message, modalVisible, title, email, address,
      mobile, zoom, lat, lng, recipe } = this.state;
    const { recipes } = this.props;
    const header = 'Seccion de contacto';
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
            <h6 className="sub-title">Datos de Contacto</h6>
            <div className="input-group">
              <label htmlFor="email">e-mail:</label>
              <input
                id="email"
                className="form-control"
                onChange={this.handleChange}
                placeholder="correo-electronico@dominio.com"
                name="email"
                value={email}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="mobile">Telefono:</label>
              <input
                id="mobile"
                className="form-control"
                onChange={this.handleChange}
                placeholder="correo-electronico@dominio.com"
                name="mobile"
                value={mobile}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="address">Direccion:</label>
              <input
                id="address"
                className="form-control"
                onChange={this.handleChange}
                placeholder="correo-electronico@dominio.com"
                name="address"
                value={address}
                required
              />
            </div>
            <h6 className="sub-title">Google Maps</h6>
            <div className="input-group">
              <label htmlFor="zoom">Zoom:</label>
              <input
                id="zoom"
                className="form-control"
                onChange={this.handleChange}
                placeholder="acercamiento: 10-20"
                name="zoom"
                value={zoom}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="lat">Latitud:</label>
              <input
                id="lat"
                className="form-control"
                onChange={this.handleChange}
                placeholder="-16.4360"
                name="lat"
                value={lat}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="lng">Longitud:</label>
              <input
                id="lng"
                className="form-control"
                onChange={this.handleChange}
                placeholder="-71.52605"
                name="lng"
                value={lng}
                required
              />
            </div>
            <button type="submit" className="btn btn-success">
              Guardar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Contact.propTypes = {
  recipes: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  recipes: state.recipes,
});

const ContactWrapper = connect(mapStateToProps, null)(Contact);

export default ContactWrapper;

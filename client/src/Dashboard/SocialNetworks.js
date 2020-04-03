import React from 'react';
import uuidv4 from 'uuid/v4';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import iconLoading from '../Images/pre-loader.gif';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './SocialNetworks.css';

class SocialNetworks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socialNetworks: [],
      loading: false,
      formVisible: false,
      message: '',
      id: null, // used in edit Products
      name: '',
      href: '',
      src: '',
      status: 1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      const res = await axios.get('/api/social_networks');
      this.setState({
        socialNetworks: res.data,
        loading: false,
      });
    } catch (err) {
      this.setState({
        loading: false,
        message: 'Error en el Servidor',
      });
    }
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
    const { id, name, href, src, status, socialNetworks } = this.state;
    try {
      const data = { name, href, src, status };
      const res = id !== null
        ? await axios.put(`api/social_networks/${id}`, data)
        : await axios.post('api/social_networks', data);

      const newSocialNetwork = {
        id: res.data.id,
        name,
        href,
        src,
        status,
      };
      if (res.status === 201) { // Created
        this.setState((prevState) => ({
          message: 'Red Social creada exitosamente',
          socialNetworks: [newSocialNetwork, ...prevState.socialNetworks],
          formVisible: false,
        }));
      }
      if (res.status === 200) { // OK - Updated
        const auxSocialNetworks = socialNetworks.filter((i) => i.id !== id);
        this.setState({
          message: 'Red Social actualizada exitosamente',
          socialNetworks: [newSocialNetwork, ...auxSocialNetworks],
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
      await axios.delete(`api/social_networks/${item.id}`);
      this.setState((prevState) => ({
        message: 'Red Social eliminada.',
        socialNetworks: prevState.socialNetworks.filter((i) => i.id !== item.id),
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
      name: item === null ? '' : item.name,
      href: item === null ? '' : item.href,
      src: item === null ? '' : item.src,
      status: item === null ? true : item.status,
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
    const { socialNetworks, loading, formVisible,
      name, href, src, status, message } = this.state;
    const { session } = this.props;
    return (
      <section className="container">
        <h2>Redes Sociales</h2>
        <p>{message}</p>
        {loading
          ? <img className="icon-loading" src={iconLoading} alt="icon-loading" />
          : null}
        {formVisible
          ? (
            <div className="row">
              <form onSubmit={this.handleSubmit} className="col-12 input-form">
                <img className="social-icon" src={src} alt={`${name}-icon`} />
                <input
                  className="form-control"
                  onChange={this.handleChange}
                  placeholder="red social ej. twitter"
                  name="name"
                  value={name}
                  disabled
                />
                <input
                  className="form-control"
                  onChange={this.handleChange}
                  placeholder="https://red-social.com/"
                  name="href"
                  value={href}
                  required
                />
                {session.user.status === 1 ? (
                  <input
                    className="form-control"
                    onChange={this.handleChange}
                    placeholder="https://icons8.com/"
                    name="src"
                    value={src}
                  />
                ) : null}
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
                <div>
                  <button type="submit" className="btn btn-success">
                    Guardar
                  </button>
                  <button className="btn btn-danger" type="button" onClick={() => this.closeForm()}>
                    Cerrar
                  </button>
                </div>
              </form>
            </div>
          )
          : (
            <div className="row social-network">
              {socialNetworks.map((item) => (
                <div key={uuidv4()} className="col-6 col-md-3 icon-text">
                  <img className="social-icon" src={item.src} alt={`${item.name}-icon`} />
                  <a href={item.href} target="_blank" rel="noopener noreferrer">{item.name}</a>
                  <button
                    className="btn btn-success"
                    type="button"
                    onClick={() => this.showForm(item)}
                  >
                    Editar
                  </button>
                </div>
              ))}
            </div>
          )}
      </section>
    );
  }
}

SocialNetworks.propTypes = {
  session: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const SocialNetworksWrapper = connect(mapStateToProps, null)(SocialNetworks);

export default SocialNetworksWrapper;

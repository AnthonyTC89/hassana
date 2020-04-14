import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-awesome-modal';
import login from '../redux/actions/login';
import { HTTPresponses } from '../PageInfo.json';
import 'bootstrap/dist/css/bootstrap.css';
import './LoginModal.css';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errMessage: '',
      btnLoading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      errMessage: '',
      btnLoading: true,
    });
    const { username, password } = this.state;
    const { addSession } = this.props;
    const params = { username, password };
    axios.post('login', params)
      .then((res) => {
        this.setState({
          btnLoading: false,
        });
        const user = { id: res.data.id, username, status: res.data.status };
        addSession(user);
      })
      .catch((err) => {
        this.setState({
          errMessage: `${HTTPresponses[err.response.status]}`,
          btnLoading: false,
        });
      });
  }

  render() {
    const { username, password, btnLoading, errMessage } = this.state;
    const { modalVisible, closeModal } = this.props;
    return (
      <Modal visible={modalVisible} width="200" height="150" onClickAway={() => closeModal()}>
        <div className="container-form">
          <form className="login-form" onSubmit={!btnLoading ? this.handleSubmit : null}>
            <input
              className="form-control login-input"
              onChange={this.handleChange}
              type="text"
              placeholder="usuario"
              value={username}
              name="username"
              required
            />
            <input
              className="form-control login-input"
              onChange={this.handleChange}
              type="password"
              placeholder="contraseña"
              value={password}
              name="password"
              required
            />
            <button className="btn btn-success login-btn" type="submit">
              {btnLoading ? 'Espere...' : 'Ingresar'}
            </button>
            <small className="login-message">{errMessage}</small>
          </form>
        </div>
      </Modal>
    );
  }
}

LoginModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  addSession: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  addSession: (user) => dispatch(login(user)),
});

const LoginModalWrapper = connect(mapStateToProps, mapDispatchToProps)(LoginModal);

export default LoginModalWrapper;

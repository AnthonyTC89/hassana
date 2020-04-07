import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HTTPresponses } from '../PageInfo.json';
import login from '../redux/actions/login';
import 'bootstrap/dist/css/bootstrap.css';
import './Login.css';

class Login extends React.Component {
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
    return (
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
    );
  }
}

Login.propTypes = {
  // session: PropTypes.object.isRequired,
  addSession: PropTypes.func.isRequired,
  // history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  addSession: (user) => dispatch(login(user)),
});

const LoginWrapper = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginWrapper;

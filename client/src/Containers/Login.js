/* eslint-disable no-console */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errMessage: 'err',
      btnLoading: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    // eslint-disable-next-line no-unused-vars
    const { username, password } = this.state;
    console.log('username: ', username);
    console.log('password: ', password);
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

export default Login;

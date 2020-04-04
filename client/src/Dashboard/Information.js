import React from 'react';
// import axios from 'axios';
import SocialNetworks from './SocialNetworks';
import Info from '../PageInfo.json';
import iconLoading from '../Images/pre-loader.gif';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './Information.css';

class Slogan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      message: '',
      info: Info,
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  async getInfo() {
    this.setState({
      loading: false,
      message: '',
    });
    // try {
    //   const res = await axios.get('/api/information');
    //   this.setState({
    //     info: res.data,
    //     loading: false,
    //   });
    // } catch (err) {
    //   this.setState({
    //     loading: false,
    //     message: 'error',
    //   });
    // }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    console.log('Submit');
  }

  render() {
    const { info, loading, message } = this.state;
    return (
      <>
        <form className="container" onSubmit={this.handleSubmit}>
          <h2>{info.headerTitle}</h2>
          <small>{message}</small>
          {loading
            ? <img className="icon-loading" src={iconLoading} alt="icon-loading" />
            : null}
          <div className="row">
            <label htmlFor="headerTitle">Titulo Principal</label>
            <input
              id="headerTitle"
              className="form-control"
              onChange={this.handleChange}
              placeholder="Texto aqui"
              name="headerTitle"
              value={info.headerTitle}
            />
            <label htmlFor="headerText">Slogan</label>
            <input
              id="headerText"
              className="form-control"
              onChange={this.handleChange}
              placeholder="Texto aqui"
              name="headerText"
              value={info.headerText}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Guardar Datos
          </button>
        </form>
        <SocialNetworks />
      </>
    );
  }
}

export default Slogan;

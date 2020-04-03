import React from 'react';
// import axios from 'axios';
import SocialNetworks from './SocialNetworks';
import Information from '../PageInfo.json';
import iconLoading from '../Images/pre-loader.gif';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './Information.css';

class Slogan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      // information: {},
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  async getInfo() {
    this.setState({
      loading: false,
    });
    // try {
    //   const res = await axios.get('/api/full_products');
    //   this.setState({
    //     products: res.data,
    //     loading: false,
    //     formVisible: res.data.length === 0,
    //   });
    // } catch (err) {
    //   this.setState({
    //     loading: false,
    //   });
    // }
  }

  render() {
    const { loading } = this.state;
    return (
      <section className="container">
        <h2>{Information.headerTitle}</h2>
        {loading
          ? <img className="icon-loading" src={iconLoading} alt="icon-loading" />
          : null}
        <SocialNetworks />
      </section>
    );
  }
}

export default Slogan;

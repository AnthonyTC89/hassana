import React from 'react';
import uuidv4 from 'uuid/v4';
import axios from 'axios';
import iconLoading from '../Images/pre-loader.gif';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './Promotions.css';

class Promotions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promotions: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  async getInfo() {
    this.setState({
      loading: true,
    });
    try {
      const res = await axios.get('/api/full_promotions');
      this.setState({
        promotions: res.data,
        loading: false,
      });
    } catch (err) {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { promotions, loading } = this.state;
    if (promotions.length === 0) { return null; }
    return (
      <section className="container promotions-section" id="promotions">
        <h2>Promociones</h2>
        {loading
          ? <img className="icon-loading" src={iconLoading} alt="icon-loading" />
          : null}
        <div className="row">
          {promotions.map((item) => (
            <article key={uuidv4()} className="col promotion">
              <img className="promo-image" src={item.location} alt={item.key} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }
}

export default Promotions;

import React from 'react';
import uuidv4 from 'uuid/v4';
import axios from 'axios';
import iconLoading from '../Images/loading.gif';
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
          ? (
            <picture className="row mx-auto">
              <img className="icon-loading" src={iconLoading} alt="icon-loading" />
            </picture>
          ) : (
            <div className="row">
              {promotions.map((item) => (
                <article key={uuidv4()} className="col promotion bg-hassana">
                  <h3 className="promo-header">{item.title}</h3>
                  <picture className="promo-picture">
                    <img className="promo-image" src={item.location} alt={item.key} />
                  </picture>
                  <div className="promo-text">
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
      </section>
    );
  }
}

export default Promotions;

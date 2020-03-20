import React from 'react';
import uuidv4 from 'uuid/v4';
import { promotions } from '../PageInfo.json';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './Promotions.css';

class Promotions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promos: promotions,
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  // eslint-disable-next-line class-methods-use-this
  async getInfo() {
    // eslint-disable-next-line no-console
    console.log('getInfo promotions');
  }

  render() {
    const { promos } = this.state;
    return (
      <section className="container promotions-section" id="promotions">
        <h2>Promociones</h2>
        <div className="row">
          {promos.map((p) => (
            <article key={uuidv4()} className="col promotion">
              <img className="promo-image" src={p.image.src} alt={`${p.image.name}-promo`} />
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }
}

export default Promotions;

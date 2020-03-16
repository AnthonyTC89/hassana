import React from 'react';
import { slogan } from '../PageInfo.json';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './Slogan.css';

class Slogan extends React.Component {
  constructor(props) {
    super(props);
    const { imageLink, title, subTitle, social } = slogan;
    this.state = {
      imageLink,
      title,
      subTitle,
      social,
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  // eslint-disable-next-line class-methods-use-this
  async getInfo() {
    // eslint-disable-next-line no-console
    console.log('getInfo Solgan');
  }

  render() {
    const { imageLink, title, subTitle, social } = this.state;
    return (
      <section className="container slogan-section">
        <div className="row">
          <picture className="col-12 col-sm-6">
            <img className="slogan-image" src={imageLink} alt="hassana-masajes-salud" />
          </picture>
          <div className="col-12 col-sm-6 slogan-info">
            <h1>{title}</h1>
            <h3>{subTitle}</h3>
            <div className="social-list">
              {social.map((s) => (
                <a className="social-link" href={s.pageLink}>
                  <img className="social-icon" src={s.iconLink} alt={`${s.name}-icon`} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Slogan;

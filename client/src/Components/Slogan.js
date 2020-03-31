import React from 'react';
import Info from '../PageInfo.json';
import Icons from '../Icons.json';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './Slogan.css';

class Slogan extends React.Component {
  constructor(props) {
    super(props);
    const { headerTitle, headerText, headerRecipe, facebook } = Info;
    this.state = {
      headerTitle,
      headerText,
      headerRecipe,
      facebook,
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
    const { headerTitle, headerText, headerRecipe, facebook } = this.state;
    return (
      <section className="container-fluid slogan-section" id="home">
        <div className="row">
          <picture className="col-12 col-sm-6">
            <img className="slogan-image" src={headerRecipe} alt="hassana-masajes-salud" />
          </picture>
          <div className="col-12 col-sm-6 slogan-info">
            <h1>{headerTitle}</h1>
            <h3>{headerText}</h3>
            <div className="social-list">
              {facebook === '' ? null : (
                <a className="social-link" href={facebook}>
                  <img className="social-icon" src={Icons.facebook} alt="facebook-icon" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Slogan;

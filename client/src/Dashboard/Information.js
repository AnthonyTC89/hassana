import React from 'react';
import uuidv4 from 'uuid/v4';
import Slogan from './Slogan';
import AboutUs from './AboutUs';
import SocialNetworks from './SocialNetworks';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './Information.css';

class Information extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Component: Slogan,
    };
    this.changeComponent = this.changeComponent.bind(this);
    this.components = {
      Slogan,
      AboutUs,
      SocialNetworks,
    };
  }

  changeComponent(name) {
    this.setState({
      Component: this.components[name],
    });
  }

  render() {
    const { Component } = this.state;
    const items = [
      { name: 'Slogan', text: 'Slogan' },
      { name: 'AboutUs', text: 'Acerca de' },
      { name: 'SocialNetworks', text: 'Redes Sociales' },
    ];
    return (
      <>
        <div className="container">
          <div className="row">
            {items.map((item) => (
              <button
                key={uuidv4()}
                className="btn btn-outline-success"
                type="button"
                onClick={() => this.changeComponent(item.name)}
              >
                {item.text}
              </button>
            ))}
          </div>
        </div>
        <Component />
      </>
    );
  }
}

export default Information;

import React from 'react';
import Slogan from './Slogan';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './Information.css';

class Information extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Component: null,
    };
  }

  render() {
    const { Component } = this.state;
    console.log(Component);
    return (
      <>
        <div className="container">
          MENU
        </div>
        <Slogan />
      </>
    );
  }
}

export default Information;

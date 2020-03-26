import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../Dashboard/Navbar';
import { slogan } from '../PageInfo.json';
import './Dashboard.css';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: slogan.title,
      recipes: [],
    };
  }

  componentDidMount() {
    const { session, history } = this.props;
    if (!session.isLoggedIn) {
      history.push('/login');
    }
    this.getRecipes();
  }

  componentDidUpdate() {
    const { session, history } = this.props;
    if (!session.isLoggedIn) {
      history.push('/');
    }
  }

  async getRecipes() {
    try {
      const recipes = await axios.get('/api/recipes');
      this.setState({
        recipes: recipes.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { title, recipes } = this.state;
    const { dashboard } = this.props;
    const { Component } = dashboard;
    return (
      <>
        <header><Navbar /></header>
        <main className="dashboard-section">
          <div><h1>{title}</h1></div>
          <Component recipes={recipes} />
        </main>
      </>
    );
  }
}

Dashboard.propTypes = {
  session: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  dashboard: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
  dashboard: state.dashboard,
});

const DashboardWrapper = connect(mapStateToProps, null)(Dashboard);

export default DashboardWrapper;

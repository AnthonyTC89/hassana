import React from 'react';
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
    };
  }

  componentDidMount() {
    const { session, history } = this.props;
    if (!session.isLoggedIn) {
      history.push('/login');
    }
  }

  componentDidUpdate() {
    const { session, history } = this.props;
    if (!session.isLoggedIn) {
      history.push('/');
    }
  }

  render() {
    const { title } = this.state;
    const { dashboard } = this.props;
    const { Component } = dashboard;
    return (
      <>
        <header><Navbar /></header>
        <main className="dashboard-section">
          <div><h1>{title}</h1></div>
          <Component />
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

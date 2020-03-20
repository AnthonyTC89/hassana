import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../Dashboard/Navbar';
import { slogan } from '../PageInfo.json';
import Testimonials from '../Dashboard/Testimonials';
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
    return (
      <>
        <header><Navbar /></header>
        <main className="dashboard-section">
          <div><h1>{title}</h1></div>
          <Testimonials />
        </main>
      </>
    );
  }
}

Dashboard.propTypes = {
  session: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const DashboardWrapper = connect(mapStateToProps, null)(Dashboard);

export default DashboardWrapper;

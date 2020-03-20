import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: props.session.isLoggedIn,
    };
  }

  render() {
    const { isLoggedIn } = this.state;
    return (
      <div>
        DASHBOARD
        {isLoggedIn}
      </div>
    );
  }
}

Dashboard.propTypes = {
  session: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const DashboardWrapper = connect(mapStateToProps, null)(Dashboard);

export default DashboardWrapper;

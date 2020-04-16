import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import login from '../redux/actions/login';
import Navbar from '../Components/Navbar';
import Slogan from '../Components/Slogan';
import AboutUs from '../Components/AboutUs';
import Services from '../Components/Services';
import Promotions from '../Components/Promotions';
import Testimonials from '../Components/Testimonials';
import Products from '../Components/Products';
import Contact from '../Components/Contact';
import Footer from '../Components/Footer';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    const { session, history } = this.props;
    if (session.isLoggedIn) {
      history.push('/dashboard');
    }
  }

  render() {
    return (
      <>
        <header><Navbar /></header>
        <main>
          <Slogan />
          <AboutUs />
          <Services />
          <Promotions />
          <Testimonials />
          <Products />
          <Contact />
        </main>
        <Footer />
      </>
    );
  }
}

Home.propTypes = {
  session: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  addSession: (user) => dispatch(login(user)),
});

const HomeWrapper = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeWrapper;

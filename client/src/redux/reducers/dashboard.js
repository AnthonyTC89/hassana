import AboutUs from '../../Dashboard/AboutUs';
import Products from '../../Dashboard/Products';
import Promotions from '../../Dashboard/Promotions';
import Services from '../../Dashboard/Services';
import Slogan from '../../Dashboard/Slogan';
import Testimonials from '../../Dashboard/Testimonials';
import Contact from '../../Dashboard/Contact';
import Images from '../../Dashboard/Images';

const defaultDashboard = {
  Component: Slogan,
};

const collection = {
  Slogan,
  AboutUs,
  Products,
  Promotions,
  Services,
  Testimonials,
  Contact,
  Images,
};

const session = (state = defaultDashboard, { type, component }) => {
  switch (type) {
    case 'UPDATE_DASHBOARD':
      return {
        Component: collection[component],
      };
    default:
      return state;
  }
};

export default session;

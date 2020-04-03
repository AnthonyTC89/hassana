import Information from '../../Dashboard/Information';
import Products from '../../Dashboard/Products';
import Promotions from '../../Dashboard/Promotions';
import Services from '../../Dashboard/Services';
import Testimonials from '../../Dashboard/Testimonials';
import Images from '../../Dashboard/Images';

const defaultDashboard = {
  Component: Information,
};

const collection = {
  Information,
  Products,
  Promotions,
  Services,
  Testimonials,
  Images,
};

const dashboard = (state = defaultDashboard, { type, component }) => {
  switch (type) {
    case 'UPDATE_DASHBOARD':
      return {
        Component: collection[component],
      };
    default:
      return state;
  }
};

export default dashboard;

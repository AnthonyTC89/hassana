import { createStore, combineReducers } from 'redux';
import session from './reducers/session';
import dashboard from './reducers/dashboard';
import recipes from './reducers/recipes';

const reducer = combineReducers({
  session,
  dashboard,
  recipes,
});

const store = createStore(reducer);

export default store;

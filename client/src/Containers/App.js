import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Home from './Home';
import Dashboard from './Dashboard';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/dashboard" component={Dashboard} exact />
        <Route path="/" component={Home} exact />
      </Switch>
      <Redirect to="/" />
    </BrowserRouter>
  </Provider>
);

export default App;

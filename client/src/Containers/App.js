import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Home from './Home';
import Dashboard from './Dashboard';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;

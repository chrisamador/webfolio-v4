import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from './src/state/store/store';

export const replaceRouterComponent = ({ history }) => {
  const store = configureStore()();
  // eslint-disable-next-line
  const ConnectedRouterWrapper = ({ children }) => (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  );

  return ConnectedRouterWrapper;
};

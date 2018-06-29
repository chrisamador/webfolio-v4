import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';

import configureStore from './src/state/store/store';

export const replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
  const store = configureStore()();

  const ConnectedBody = () => (
    <Provider store={store}>
      {bodyComponent}
    </Provider>
  );
  replaceBodyHTMLString(renderToString(<ConnectedBody/>));
};

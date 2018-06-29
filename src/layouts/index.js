import React from 'react';

import Header from './header/Header';
import Footer from './footer/Footer';

import '../styles/app.less';
// import Symbols from '-!svg-react-loader!./symbols.svg';

// eslint-disable-next-line
const Main = ({ children }) => (
  <div className="app">
    <Header />
    {children()}
    <Footer />
  </div>
);

export default Main;

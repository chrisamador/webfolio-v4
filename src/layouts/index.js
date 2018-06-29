import React from 'react';

import Header from './header/Header';
import Footer from './footer/Footer';
import Link from 'gatsby-link';

import '../styles/app.less';
// import Symbols from '-!svg-react-loader!./symbols.svg';

// eslint-disable-next-line
const Main = ({ children }) => (
  <div className="app">
    {/* <Header /> */}
    <Link to="/" exact activeClassName="hello" activeStyle={{color: 'red'}}>Home</Link>
    <Link to="/about" exact activeClassName="hello" activeStyle={{color: 'red'}}>About</Link>
    {children()}
    {/* <Footer /> */}
  </div>
);

export default Main;

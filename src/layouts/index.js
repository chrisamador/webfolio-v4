// @flow
import React, { PureComponent } from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import Link from 'gatsby-link';

import '../styles/app.less';
import Symbols from '-!svg-react-loader!../assets/icons/symbols.svg';

type PropType = {};
type StateType = {};

class Main extends PureComponent<PropType, StateType> {
  state = {};
  render(){
    let {children} = this.props;
    return (
      <div className="app">
        {Symbols ? <Symbols className="hidden-svg" /> : null}
        <Header />
        <div id="page" className="page page--in-view">
          <div className="page__logo-area">
            <Link to="/">
              <h6 className="page__logo-text" style={{color: 'white'}}>
                <span>Creative</span> Front-End Developer
              </h6>
            </Link>
          </div>
          {children()}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Main;

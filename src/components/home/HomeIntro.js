// @flow
import React, { PureComponent } from 'react';
import {Link} from 'react-router-dom';

import HomeIntroBg from './HomeIntroBg';
import InViewMonitor from 'react-inview-monitor';

type PropType = {};
type StateType = {
};

class HomeIntro extends PureComponent<PropType, StateType> {
  render(){
    return (
      <InViewMonitor
        classNameNotInView=""
        classNameInView="home-intro-in-view"
        intoViewMargin="-5%"
        toggleClassNameOnInView={true}>
        <section className="home-intro">
          <div className="container is-position">
            <h6>Among the many things I love to do,</h6>
            <h2 className="home-intro__title">I Design <span className="text-group">& Code</span></h2>
            <h3>Websites, Brands, <span className="text-group">Apps, and Prints</span></h3>
            <div>
              <Link to="/works" className="btn btn-ghost-light">View Works</Link>
              <h6 className="home-intro__or">or</h6>
              <a href="#" className="btn btn-ghost-light">Contact Me</a>
            </div>
          </div>

          <HomeIntroBg/>

        </section>
      </InViewMonitor>
    );
  }
}

export default HomeIntro;

// @flow
import React, { PureComponent } from 'react';
import FunShapes from '../shared/FunShapes';
import Icon from '../shared/Icon';
import Col from '../shared/layout/Col';
import Row from '../shared/layout/Row';
import {connect} from 'react-redux';

import Link from 'gatsby-link';

type PropType = {
  loadTime: void | number
};
type StateType = {};

class HomeHero extends PureComponent<PropType, StateType> {
  state = {};
  render(){
    return (
      <section className="home-hero">
        <FunShapes strokeColor="#723239" />
        <div className="container is-position">
          <h1 className="home-hero__title">Hello</h1>
          <Row>
            <Col className="col-xs-12 col-sm-9">
              <h3 className="home-hero__subtitle">I&#8217;m <Link to="/about">Chris Amador</Link></h3>
              <div className="home-hero__bio">
                <p>I Make [Cool] Things on The Internet</p>
              </div>
            </Col>
            <Col className="col-xs-12 col-sm-3">
              <div className="home-hero__welcome text-sm-right">
                <h6>Welcome To My Webfolio V4.0.0</h6>
              </div>
            </Col>
          </Row>

        </div>
        <h6 className="home-hero__speed">
          <span>Average 430 ms</span>
          <Icon id="icon-lighting" />
          <Icon id="icon-lighting" />
          <Icon id="icon-lighting" />
        </h6>
        <div className="home-hero__social">
          <ul>
            <li><a target="_blank" rel="noopener noreferrer" href="http://codepen.io/chrisamador/"><Icon id="icon-codepen-logo"/></a></li>
            <li><a target="_blank" rel="noopener noreferrer" href="https://github.com/chrisamador"><Icon id="icon-github"/></a></li>
            <li><a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/chris-amador-b3307288"><Icon id="icon-linkedin"/></a></li>
            <li><a href="mailto:chris@chrisamador.me?subject=Website Contact&body=Hi Chris,"><Icon id="icon-contact"/></a></li>
          </ul>
        </div>
        <div className="home-hero__arrow">
          <Icon id="icon-down-arrow" />
          <Icon id="icon-down-arrow" />
          <Icon id="icon-down-arrow" />
        </div>
      </section>
    );
  }
}

export default connect((state)=>({
  loadTime: 999, //state.siteMeta.loadTime
}))(HomeHero);

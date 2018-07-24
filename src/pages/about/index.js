// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Seo from '../../components/shared/Seo';
import {SiteMetaActions} from '../../state/reducers/siteMeta';
// import FunShapes from '../../common/FunShapes';
import Icon from '../../components/shared/Icon';
import Col from '../../components/shared/layout/Col';
import Row from '../../components/shared/layout/Row';

type PropType = {};
type StateType = {};

class About extends PureComponent<PropType, StateType> {
  state = {};
  componentDidMount(){
    this.props.dispatch(SiteMetaActions.updateSiteMetaColor('white'))
  }
  render() {
    return (
      <div className="about">
        <Seo
          title="About"
          url={this.props.pageResources ? this.props.pageResources.page.path : null}/>
        {/* <FunShapes strokeColor="#723239" /> */}
        <div className="container">
          <div className="about__profile-area">
            <img
              src="https://res.cloudinary.com/camador/image/upload/v1525135385/webfolio/profile.jpg"
              alt=""
              className="about__profile-image"
            />
          </div>
          <Row>
            <Col className="col-xs-12 col-sm-9">
              <div className="about__content">
                <p className="h1">Hello...</p>
                <p className="h2">
                  I&apos;m Chris, a Creative Front-End Developer in the D.C area
                  that deeply cares for design and development.
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="col-xs-12 col-sm-9">
              <div className="about__content">
                <p className="h3">
                  Both are my passion, I enjoy every facet that comes with the
                  process of designing an idea to an actual product. The thrill
                  of creating is what pushes me in my career and it’s what
                  excites me everyday. I love beautiful typography, modern
                  minimal designs, strong layouts, and simple solutions to
                  complicated problems.
                </p>
                <div className="about__contact-area">
                  <a href="mailto:chris@chrisamador.me?subject=Website Contact&body=Hi Chris," className="btn btn-white">Let&apos;s Talk!</a>
                </div>
              </div>
            </Col>
            <Col className="col-xs-12 col-sm-3">
              <div className="about__content">
                <div className="about__meta">
                  <h6>Years of Exp</h6>
                  <small>7, 2011 - 2018</small>
                </div>
                <div className="about__meta">
                  <h6>Formal EDU.</h6>
                  <small>BFA, George Mason U.</small>
                </div>
                <div className="about__social">
                  <ul>
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="http://codepen.io/chrisamador/">
                        <Icon id="icon-codepen-logo" />
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://github.com/chrisamador">
                        <Icon id="icon-github" />
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.linkedin.com/in/chris-amador-b3307288">
                        <Icon id="icon-linkedin" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default connect(() => ({
}))(About);

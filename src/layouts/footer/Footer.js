// @flow
import React, { PureComponent } from 'react';
import Link from 'gatsby-link';

import Icon from '../../components/shared/Icon';
import Col from '../../components/shared/layout/Col';
import Row from '../../components/shared/layout/Row';

type PropType = {
  numWorks: number,
  numLogs: number,
  numNotes: number,
};
type StateType = {};

class Footer extends PureComponent<PropType, StateType> {
  state = {};
  anchorClick(e: SyntheticEvent<HTMLAnchorElement>) {
    e.currentTarget.blur();
  }
  render() {
    let { numLogs, numWorks, numNotes } = this.props;
    if (!numLogs) numLogs = 99;
    if (!numWorks) numWorks = 99;
    if (!numNotes) numNotes = 99;

    return (
      <footer className="footer">
        <div className="container">
          <Row>
            <Col className="col-xs-12 col-sm-9">
              <nav className="footer__nav-list">
                <ul className="footer-nav">
                  <li>
                    <Link
                      to="/"
                      exact
                      onClick={this.anchorClick}
                      activeClassName="active">
                      Home
                    </Link>{' '}
                  </li>
                  <li>
                    <Link
                      to="/works"
                      exact
                      onClick={this.anchorClick}
                      activeClassName="active">
                      Works <sup>{numWorks}</sup>{' '}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/logs-and-notes"
                      exact
                      onClick={this.anchorClick}
                      activeClassName="active">
                      Logs & Notes <sup>{numLogs + numNotes}</sup>{' '}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      exact
                      onClick={this.anchorClick}
                      activeClassName="active">
                      About
                    </Link>{' '}
                  </li>
                  <li>
                    <a href="#" onClick={this.anchorClick}>
                      Contact
                    </a>
                  </li>
                </ul>
              </nav>
            </Col>
            <Col className="col-xs-12 col-sm-3">
              <div className="text-sm-right">
                <a href="#" className="footer__back-to-top">
                  <Icon id="icon-up-arrow" />
                </a>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="col-xs-8 col-sm-6">
              <div className="footer__copyright">
                <h6>
                  © 2018 July – Copyright Bluh Bluh Bluh, Steal Don’t Copy ;)
                </h6>
              </div>
            </Col>
            <Col className="col-xs-4 col-sm-6">
              <div className="text-right">
                <Icon id="icon-logo" className="icon-logo icon-logo--footer" />
              </div>
            </Col>
          </Row>
        </div>
      </footer>
    );
  }
}

export default Footer;

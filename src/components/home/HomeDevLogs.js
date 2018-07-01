// @flow
// import type {DevLogType} from "../../../types/siteTypes";

import React, { PureComponent } from "react";
import Icon from "../shared/Icon";
import Col from "../shared/layout/Col";
import Row from "../shared/layout/Row";

import Link from 'gatsby-link';
import DevLogPreview from "../lognotes/previews/DevlogPreview";
import DevlogPreviewMini from "../lognotes/previews/DevlogPreviewMini";

type PropType = {
  // devlogs: Array<DevLogType>
};
type StateType = {};

class HomeDevLogs extends PureComponent<PropType, StateType> {
  state = {};
  render(){
    return (
      <section className="home-dev-logs">
        <div className="container">
          <Row>
            <Col className="col-xs-12 col-sm-12 col-md-4">
              <h5 className="text-subtitle">Latest</h5>
              <h4 className="text-section-title">Dev.Logs</h4>
              <div className="text-intro">
                <p>Dev.Logs (Development Logs) are my thoughts on all things related to the development process. Occasionally I share things about build processes, tooling, javascript, productivity, and anything interesting enough to share.</p>
              </div>
              <Link style={{marginBottom: 40}} to="/logs-and-notes?view=logs" className="btn btn-ghost">View All</Link>
            </Col>
            <Col className="col-xs-12 col-sm-6 col-md-4">
              <DevLogPreview devlog={this.props.devlogs[0]} />
            </Col>
            <Col className="col-xs-12 col-sm-6 col-md-4">
              <DevLogPreview devlog={this.props.devlogs[1]} />
            </Col>
          </Row>
          <Row>
            {
              this.props.devlogs.slice(2,4).map((devlog, index) => (
                <Col className="col-xs-12 col-sm-6 col-md-3" key={index}>
                  <DevlogPreviewMini devlog={devlog} />
                </Col>
              ))
            }

            <Col className="col-xs-12 col-sm-6 col-md-3">
              <Link to="/logs-and-notes?view=logs" className="devdes-more">
                <div className="devdes-more__text">
                  <h5 className="text-subtitle">View All</h5>
                  <Icon id="icon-right-arrow" className="icon-more-arrow"/>
                </div>
              </Link>
            </Col>
          </Row>
        </div>
      </section>
    );
  }
}

export default HomeDevLogs;

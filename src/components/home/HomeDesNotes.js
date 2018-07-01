// @flow
// import type {DesNotesType} from '../../../types/siteTypes';

import React, { PureComponent } from 'react';
import Icon from '../shared/Icon';
import Col from '../shared/layout/Col';
import Row from '../shared/layout/Row';

import Link from 'gatsby-link';

import DesNotesPreview from '../lognotes/previews/DesnotePreview';
import DesNotesPreviewMini from '../lognotes/previews/DesnotePreviewMini';

type PropType = {
  // desnotes: Array<DesNotesType>
};
type StateType = {};

class HomeDesNotes extends PureComponent<PropType, StateType> {
  state = {};
  render(){
    return (
      <section className="home-des-notes">
        <div className="container">
          <Row>
            <Col className="col-xs-12 col-sm-12 col-md-4">
              <h5 className="text-subtitle">Latest</h5>
              <h4 className="text-section-title">Des.Notes</h4>
              <div className="text-intro">
                <p>Des.Notes (Design Notes) are my thoughts on all things related to the design process. Occasionally I share things about trends, tools, design patterns, and anything interesting enough to share.</p>
              </div>
              <Link style={{marginBottom: 40}} to="/logs-and-notes?view=notes" className="btn btn-ghost">View All</Link>
            </Col>
            <Col className="col-xs-12 col-sm-6 col-md-4">
              <DesNotesPreview desnote={this.props.desnotes[0]} />
            </Col>
            <Col className="col-xs-12 col-sm-6 col-md-4">
              <DesNotesPreview desnote={this.props.desnotes[1]} />
            </Col>
          </Row>
          <Row>
            {
              this.props.desnotes.slice(2,4).map((desnote, index) => (
                <Col className="col-xs-12 col-sm-6 col-md-3" key={index}>
                  <DesNotesPreviewMini desnote={desnote} />
                </Col>
              ))
            }
            <Col className="col-xs-12 col-sm-6 col-md-3">
              <Link to="/logs-and-notes?view=notes" className="devdes-more">
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

export default HomeDesNotes;

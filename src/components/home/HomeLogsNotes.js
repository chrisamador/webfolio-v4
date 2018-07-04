// @flow
// import type {DesNotesType} from '../../../types/siteTypes';

import React, { PureComponent } from 'react';
import Icon from '../shared/Icon';
import Col from '../shared/layout/Col';
import Row from '../shared/layout/Row';

import Link from 'gatsby-link';

import DesNotesPreview from '../lognotes/previews/DesnotePreview';
import DesNotesPreviewMini from '../lognotes/previews/DesnotePreviewMini';
import DevLogPreview from '../lognotes/previews/DevlogPreview';
import DevlogPreviewMini from '../lognotes/previews/DevlogPreviewMini';

import type {QueryContentLogsNotesType} from '../../pages/index';

type PropType = {
  // logsnotes: Array<DesNotesType>
  type: 'logs' | 'notes',
  logsnotes: QueryContentLogsNotesType
};
type StateType = {};

let previewType = {
  logs: DevLogPreview,
  notes: DesNotesPreview,
};

let previewMiniType = {
  logs: DevlogPreviewMini,
  notes: DesNotesPreviewMini,
};


const ref = {
  section_title: {
    logs: () => ('Logs'),
    notes: () => ('Notes'),
  },
  text_intro: {
    logs: () => 'Logs (Development Logs) are my thoughts on all things related to the development process. Occasionally I share things about build processes, tooling, javascript, productivity, and anything interesting enough to share.',
    notes: () => 'Notes (Design Notes) are my thoughts on all things related to the design process. Occasionally I share things about trends, tools, design patterns, and anything interesting enough to share.',
  }
};

const d = (type) => (item) => {
  try{
    return ref[item][type]();

  }catch(error){
    console.error(error);
  }
};

class HomeLogsNotes extends PureComponent<PropType, StateType> {
  state = {};
  render(){
    let logsnotes = [...this.props.logsnotes.edges];
    let {type} = this.props;
    let Preview = previewType[type];
    let PreviewMini = previewMiniType[type];

    return (
      <section className="home-des-notes">
        <div className="container">
          <Row>
            <Col className="col-xs-12 col-sm-12 col-md-4">
              <h5 className="text-subtitle">Latest</h5>
              <h4 className="text-section-title">{d(type)('section_title')}</h4>
              <div className="text-intro">
                <p>{d(type)('text_intro')}</p>
              </div>
              <Link
                style={{marginBottom: 40}}
                to={'/logs-notes?view=' + type}
                className="btn btn-ghost">View All</Link>
            </Col>
            <Col className="col-xs-12 col-sm-6 col-md-4">
              <Preview single={logsnotes.shift()} />
            </Col>
            <Col className="col-xs-12 col-sm-6 col-md-4">
              <Preview single={logsnotes.shift()} />
            </Col>
          </Row>
          <Row>
            {
              logsnotes.map((single, index) => (
                <Col className="col-xs-12 col-sm-6 col-md-3" key={index}>
                  <PreviewMini single={single} />
                </Col>
              ))
            }
            {logsnotes.length > 0 &&
              (<Col className='col-xs-12 col-sm-6 col-md-3'>
                <Link to={'/logs-notes?view=' + type} className="devdes-more">
                  <div className="devdes-more__text">
                    <h5 className="text-subtitle">View All</h5>
                    <Icon id="icon-right-arrow" className="icon-more-arrow"/>
                  </div>
                </Link>
              </Col>)}
          </Row>
        </div>
      </section>
    );
  }
}

export default HomeLogsNotes;

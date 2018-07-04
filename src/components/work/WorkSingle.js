// @flow
import React, { PureComponent } from 'react';
import Col from '../shared/layout/Col';
import Row from '../shared/layout/Row';
import Link from 'gatsby-link';
import MockScreen from '../shared/MockScreen';

import type {QueryWorksSingleType} from '../../pages/index';

type PropType = {
  work: QueryWorksSingleType,
  userWorkMeta: typeof undefined | {
    percent_read?: number,
    read?: boolean
  }
};
type StateType = {};

class WorksSingle extends PureComponent<PropType, StateType> {
  state = {};
  render(){
    let {work, userWorkMeta} = this.props;

    let read = (userWorkMeta) ? userWorkMeta.read : false;
    if(!work) return null;
    return (
      <div className="work-example" style={{backgroundImage: `url(${work.node.frontmatter.image_bg.childImageSharp.sizes.originalImg})`}}>
        <div className="container">
          <Row>
            <Col className="col-xs-12 col-sm-5">
              <div className="work-example__content">
                {/* <ReadStatus read={read} /> */}
                <h2 className="work-example__title">{work.node.frontmatter.title}</h2>
                <div className="work-example__preview">
                  <p>{work.node.frontmatter.preview}</p>
                </div>
                <Link to={work.node.fields.slug} className="btn btn-white">See More</Link>
              </div>
            </Col>
            <Col className="col-xs-12 col-sm-7">
              <Link to={work.node.fields.slug}>
                <MockScreen backgroundImage={work.node.frontmatter.image_preview.childImageSharp.sizes.originalImg}/>
              </Link>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

let ReadStatus = (props) => {
  if(props.read){
    return (<div className="badge badge--read">Read</div>);
  }
  return (<span><div className="badge badge--new">New!</div></span>);
};

export default WorksSingle;

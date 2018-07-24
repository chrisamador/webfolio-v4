// @flow
import React, { PureComponent } from "react";
import Col from '../../components/shared/layout/Col';
import Row from '../../components/shared/layout/Row';
import Section from './Section';

import {cleanChildren} from './Section';

import MockScreen from '../../components/shared/MockScreen';

type PropType = {
  color: string,
  url?: string
};
type StateType = {};

let cleanedSubChildren;

class Designs extends PureComponent<PropType, StateType> {
  state = {};
  render(){

    let cleanedChildren = cleanChildren(this.props.children)
    return (
      <Section title="Designs" number="3">
        <div className="work-single__section-content-designs"
          style={{backgroundColor: this.props.color}}>
          <div className="container">
            <Row>
              {cleanedChildren.map(childElm => {
                cleanedSubChildren = cleanChildren(childElm.props.children);
                return (
                  <Col className={'col-sm-' + ((childElm.props.type === 'single' ? '12': '6' ))} key={childElm.key}>
                    <figure className={'section-content-designs is-' + childElm.props.type} >
                      <MockScreen>
                        {cleanedSubChildren.shift()}
                      </MockScreen>
                      {cleanedSubChildren && (
                        <div className="section-content-designs__caption">
                          {cleanedSubChildren.shift()}
                        </div>
                      )}
                    </figure>
                  </Col>
                );
              })}
            </Row>
            <div>
              {this.props.url && <LinkToSite url={this.props.url} />}
            </div>
          </div>
        </div>
      </Section>
    );
  }
}

const LinkToSite = ({url}) => {
  return (
    <div className="text-center">
      <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-white">Visit Live Site</a>
      <a href="mailto:chris@chrisamador.me?subject=Website Contact&body=Hi Chris," className="btn btn-ghost-white">Contact Me</a>
    </div>
  )
}

export default Designs;

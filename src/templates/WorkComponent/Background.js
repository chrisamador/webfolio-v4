// @flow
import React, { PureComponent } from "react";
import Col from '../../components/shared/layout/Col';
import Row from '../../components/shared/layout/Row';
import Section from './Section';

type PropType = {};
type StateType = {};

import {cleanChildren} from './Section';

class ComponentName extends PureComponent<PropType, StateType> {
  state = {};
  render(){
    let cleanedChildren = cleanChildren(this.props.children);
    
    return (
      <Section title="Background" number="1">
        <div className="container">
          <Row className="u-mb-m">
            <Col className="col-xs-12 col-sm-8 col-sm-offset-2">
              {cleanedChildren.shift()}
            </Col>
          </Row>
          <Row className="text-sm-center">
            {
              cleanedChildren.map((child, index) => (
                <Col className="col-sm-4" key={index}>
                  {child}
                </Col>
              ))
            }
          </Row>
        </div>
      </Section>
    );
  }
}

export default ComponentName;


// {
//   callouts.map((item, index) => (
//     <Col className="col-xs-6 col-sm-4 text-sm-center" key={index}>
//       <ReactMarkdown source={item} />
//     </Col>
//   ))
// }

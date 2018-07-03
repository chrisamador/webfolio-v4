// @flow
import React, { PureComponent } from "react";
import Col from '../../components/shared/layout/Col';
import Row from '../../components/shared/layout/Row';
import Section from './Section';
import Color from 'color';

type PropType = {};
type StateType = {};

import {cleanChildren} from './Section';

let Type;

class Styleguide extends PureComponent<PropType, StateType> {
  state = {};
  render(){
    // type = typefaces | colors | elements
    let cleanedChildren = cleanChildren(this.props.children);
    return (
      <Section title="Style Guide" number="2">
        <div className="container">
          <Row>
            <Col className="col-xs-12 col-sm-10 col-sm-offset-1">
              {
                cleanedChildren.map(elm => {
                  Type = types[elm.props.type]
                  return (<Type child={elm.props.children}  key={elm.key}/>)
                })
              }
            </Col>
          </Row>
        </div>
      </Section>
    );
  }
}



const StyleGuideTypefacesElm = ({child}) => (
  <div className="style-guide">
    <div className="style-guide__header">
      <h5>Typefaces</h5>
    </div>
    <div className="style-guide__content">
      <div className="style-guide__typefaces">
        {child}
      </div>
    </div>
  </div>
);

const StyleGuideColorsElm = ({child}) => (
  <div className="style-guide">
    <div className="style-guide__header">
      <h5>Brand Colors</h5>
    </div>
    <div className="style-guide__content">
      {
        cleanChildren(child).map(colorElm => (
          <div className="brand-elm-color" key={colorElm.key}>
            <div className="brand-elm-color__container">
              <div className="brand-elm-color__plus" style={{backgroundColor: Color(colorElm.props['data-color']).lighten(.3).hsl().string()}}></div>
              <div className="brand-elm-color__main" style={{backgroundColor: colorElm.props['data-color']}}></div>
              <div className="brand-elm-color__minus" style={{backgroundColor: Color(colorElm.props['data-color']).darken(.3).hsl().string()}}></div>
            </div>
            <h6>{colorElm.props['data-color']}</h6>
          </div>
        ))
      }
    </div>
  </div>
)

const StyleGuideElementsElm = ({child}) => (
  <div className="style-guide">
    <div className="style-guide__header">
      <h5>Brand Elements</h5>
    </div>
    <div className="style-guide__content">
      {/* <img className="style-guide__brand-elm-img" src={brandElements[key]} alt={key}/> */}
      {
        cleanChildren(child).map(styleElm => (
          <div className="style-guide__brand-elm-img" key={styleElm.key}>
            {styleElm}
          </div>
        ))
      }
    </div>
  </div>
)

const types = {
  typefaces: StyleGuideTypefacesElm,
  colors: StyleGuideColorsElm,
  elements: StyleGuideElementsElm
}

export default Styleguide;

// @flow
import React, { PureComponent } from "react";
import Col from "../../common/layout/Col";
import Row from "../../common/layout/Row";
import {Link} from "react-router-dom";

import type {WorkType} from "../../../types/siteTypes";

type PropType = {
  work: WorkType
};
type StateType = {};

class HomeWorksSingle extends PureComponent<PropType, StateType> {
  state = {};
  render(){
    let {work} = this.props;
    if(!work) return null;
    return (
      <div className="work-example" style={{backgroundImage: `url(${work.images.bg})`}}>
        <div className="container">
          <Row>
            <Col className="col-sm-5">
              <h2 className="work-example__title">{work.title}</h2>
              <div className="work-example__preview">
                <p>{work.preview}</p>
              </div>
              <Link to={"/works/" + work.slug} className="btn btn-ghost-light">See More</Link>
            </Col>
            <Col className="col-sm-7">
              <div className="mock-screen">
                <div className="mock-screen__top-bar">
                  <span></span>
                </div>
                <div className="mock-screen__screen" style={{backgroundImage: `url(${work.images.preview})`}}>

                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default HomeWorksSingle;

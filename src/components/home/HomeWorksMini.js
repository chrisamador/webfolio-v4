// @flow
import React, { PureComponent } from "react";
import Col from "../../common/layout/Col";
import Row from "../../common/layout/Row";

type PropType = {};
type StateType = {};

class HomeMiniWorks extends PureComponent<PropType, StateType> {
  state = {};
  render(){
    return (
      <section className="home-mini-works">
        <header className="home-mini-works__header">
          <div className="container">
            <h5 className="text-subtitle">Mini Projects</h5>
            <h4 className="text-section-title">For Fun</h4>
          </div>
        </header>
        <div className="container">
          <Row>
            <Col className="col-sm-4">Project</Col>
            <Col className="col-sm-4">Project</Col>
            <Col className="col-sm-4">Project</Col>
          </Row>
        </div>
      </section>
    );
  }
}

export default HomeMiniWorks;

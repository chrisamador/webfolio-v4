// @flow
import type {DevLogType, DesNotesType} from '../../../types/siteTypes';

import React, { PureComponent } from "react";
import {connect} from "react-redux";
import queryString from "query-string";

import {siteMetaActions} from "../../../state/reducer/rootReducer";
import FunShapes from '../../common/FunShapes';
import Col from '../../common/layout/Col';
import Row from '../../common/layout/Row';
import DesNotesPreview from './previews/DesnotePreview';
import DesNotesPreviewMini from './previews/DesnotePreviewMini';
import DevLogPreview from './previews/DevlogPreview';
import DevLogPreviewMini from './previews/DevlogPreviewMini';

type PropType = {
  devlogs: Array<DevLogType>,
  desnotes: Array<DesNotesType>
};

type StateType = {
  view: "both" | "logs" | "notes"
};

class LogNotesPageList extends PureComponent<PropType, StateType> {
  state = {
    view: "both"
  };
  componentWillMount(){
    this.props.dispatch(siteMetaActions.changeHeroColor("#66272E"));
    this.checkView(this.props);
  }
  componentWillReceiveProps(nextProps){
    if (this.props.location !== nextProps.location) {
      this.checkView(nextProps);
    }
  }
  checkView = (props) => {
    let view = queryString.parse(props.location.search).view;
    this.setState({
      view: view ? view : "both"
    })
  }
  handleChangeView = (view) => (ev) => {
    ev.currentTarget.blur();
    this.setState({view});
  }
  render(){
    let list: Array<DesNotesType> | Array<DevLogType>;

    switch (this.state.view) {
      case "both":
        list = [...this.props.devlogs,...this.props.desnotes];
        break;
      case "logs":
        list = this.props.devlogs;
        break;
      case "notes":
        list = this.props.desnotes;
        break;
    }
    return (
      <div className="devdes">
        <FunShapes strokeColor="#E8E2D7" />
        <div className="devdes__hero">
          <div className="container text-sm-center">
            <Row className="devdes__hero-logos text-center">
              <Col className="col-xs-12 col-sm-6">
                <div className="devdes-logo">
                  <div className="devdes-logo__subtitle">Dev + How Tos + Thoughts</div>
                  <div className="devdes-logo__title">Dev.Logs</div>
                </div>
              </Col>
              <Col className="col-xs-12 col-sm-6">
                <div className="devdes-logo">
                  <div className="devdes-logo__subtitle">Design + How Tos + Thoughts</div>
                  <div className="devdes-logo__title">Des.Notes</div>
                </div>
              </Col>
            </Row>
            <p className="devdes__hero-intro"><strong>Dev.Logs (Development Logs)</strong> and <strong>Des.Notes (Design Thoughts)</strong> are my thoughts on all things related to the development and design process. Occasionally I share things about build processes, tooling, javascript, productivity, design trends, design tools, design patterns, and anything interesting enough to share. </p>
            <div className="devdes__hero-options text-center">
              <button
                className={"btn btn-ghost" + (this.state.view === "both"? " is-active": "")}
                onClick={this.handleChangeView("both")}>Both ({this.props.devlogs.length + this.props.desnotes.length})</button>
              <div className="u-sm-d-ib u-sm-ml-s"> <button
                className={"btn btn-ghost" + (this.state.view === "logs"? " is-active": "")}
                onClick={this.handleChangeView("logs")}>Dev.Logs ({this.props.devlogs.length}) </button>
              <button
                className={"btn btn-ghost" + (this.state.view === "notes"? " is-active": "")}
                onClick={this.handleChangeView("notes")}>Des.Notes ({this.props.desnotes.length}) </button>
              </div>
            </div>
          </div>
        </div>
        <div className="devdes__list">
          <div className="container">
            <Row>
              {
                list && list.slice(0, 6).map((d) => {
                  switch (d.type) {
                    case "devlog": return (
                      <Col className="col-xs-12 col-sm-4" key={d.slug}>
                        <DevLogPreview devlog={d}/>
                      </Col>
                    );
                    case "desnote": return (
                      <Col className="col-xs-12 col-sm-4" key={d.slug} >
                        <DesNotesPreview desnote={d}/>
                      </Col>
                    );
                  }
                })
              }
            </Row>
            <Row>
              {
                list && list.slice(6).map((d) => {
                  switch (d.type) {
                    case "devlog": return (
                      <Col className="col-xs-12 col-sm-3" key={d.slug}>
                        <DevLogPreviewMini devlog={d}/>
                      </Col>
                    );
                    case "desnote": return (
                      <Col className="col-xs-12 col-sm-3" key={d.slug} >
                        <DesNotesPreviewMini desnote={d}/>
                      </Col>
                    );
                  }
                })
              }
            </Row>
          </div>
        </div>
      </div>

    );
  }
}

export default connect((state) => ({
  devlogs: state.logs,
  desnotes: state.notes
}))(LogNotesPageList);

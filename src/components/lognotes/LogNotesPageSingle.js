// @flow
import type {DevLogType, DesNotesType} from '../../../types/siteTypes';

import React, { PureComponent } from "react";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import {siteMetaActions, userActions} from '../../../state/reducer/rootReducer';
import Icon from '../../common/Icon';
import Col from '../../common/layout/Col';
import Row from '../../common/layout/Row';
import DesNotesPreviewMini from './previews/DesnotePreviewMini';
import DevLogPreviewMini from "./previews/DevlogPreviewMini";
import dateFormater from '../../common/ults/dateFormater';
import FunShapes from '../../common/FunShapes';

const ref = {
  logo_subtitle: {
    devlog: () => ("Dev + How Tos + Thoughts"),
    desnote: () => ("Desing + How Tos + Thoughts")
  },
  logo_title: {
    devlog: () => "Dev.Logs",
    desnote: () => "Des.Notes"
  },
  viewmore: {
    devlog: () => "logs",
    desnote: () => "notes"
  },
  heroTitle: {
    devlog: function heroTitle ({title, date}) {
      return (
        <Row>
          <Col className="col-sm-7">
            <div className="devdes-single__dev-title">
              <h1>{title}</h1>
              <h6>{date}</h6>
            </div>
          </Col>
        </Row>

      )
    },
    desnote: function heroTitle ({title, date}) {
      return (
        <div className="devdes-single__des-title">
          <h1>{title}</h1>
          <h6><div>{date}</div></h6>
        </div>

      );
    }
  }
};

const d = (type) => (item, opts) => {
  try{
    return ref[item][type](opts);

  }catch(error){
    console.error(error)
  }
}

type PropType = {
  devdes: DevLogType | DesNotesType,
  related: Array<DevLogType> | Array<DesNotesType>
};
type StateType = {};

class LogNotesPageListSingle extends PureComponent<PropType, StateType> {
  state = {};
  componentWillMount(){
    this.props.dispatch(siteMetaActions.changeHeroColor("#66272E"));
  }
  componentDidMount(){
    this.confirmRead(this.props);
  }
  componentWillReceiveProps(nextProps){
    this.confirmRead(nextProps);
  }
  confirmRead(props){
    let action;
    switch (props.devdes.type) {
      case "devlog":
        action = userActions.changeLogsReadStatus(props.devdes.slug, true);
        break;
      case "desnote":
        action = userActions.changeNotesReadStatus(props.devdes.slug, true);
        break;
    }
    if(action) this.props.dispatch(action);
  }
  render(){
    let {devdes, related} = this.props;
    let formatDate = dateFormater(devdes.meta.date);

    return (
      <div className={"devdes-single is-" + devdes.type + " is-color-" + devdes.meta.primary_color}>
        <FunShapes strokeColor="#E8E2D7" style={{zIndex: -1}}/>
        <div className="devdes-single__logo">
          <div className="devdes-logo">
            <div className="devdes-logo__subtitle">{d(devdes.type)("logo_subtitle")}</div>
            <div className="devdes-logo__title">{d(devdes.type)("logo_title")}</div>
          </div>
        </div>
        <div className="devdes-single__hero">
          <div className="container is-position">
            {d(devdes.type)("heroTitle", {
              title: devdes.title,
              date: formatDate
            })}
            { devdes.type === "devlog" &&
              (devdes.images.main_id
                ? (<div>
                  <Icon id={devdes.images.type} className="icon-devlog" style={{top: 50, right: 100}}/>
                  <Icon id={devdes.images.main_id} className="icon-devlog-large" style={{top: 60, right: 100}}/>
                </div>
                )
                :(
                  <Icon id={devdes.images.type} className="icon-devlog" style={{top: 50, right: 100}}/>
                ))
            }
          </div>

        </div>
        <div className="devdes-single__meta">
          <div className="container">
            <div className="devdes-meta">
              <Row>
                <Col className="col-xs-6 col-sm-3">
                  <div className="devdes-meta__single">
                    <h6>Typeof</h6>
                    <h5>{devdes.meta.type_of}</h5>
                  </div>
                </Col>
                <Col className="col-xs-6 col-sm-3">
                  <div className="devdes-meta__single">
                    <h6>Minute Read</h6>
                    <h5>{devdes.meta.min_read}</h5>
                  </div>
                </Col>
                <Col className="col-xs-6 col-sm-3">
                  <div className="devdes-meta__single">
                    <h6>Topic</h6>
                    <h5>{devdes.tags[0]}</h5>
                  </div>
                </Col>
                <Col className="col-xs-6 col-sm-3">
                  <div className="devdes-meta__single">
                    <h6>Min Exp</h6>
                    <h5>{devdes.meta.exp}</h5>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <div className="devdes-single__content">
          <div className="container">
            <div className={"devdes-single__content-inner is-" + devdes.type}>
              {
                Object.keys(devdes.content).map((key) => {
                  return (
                    <Row key={key} className="devdes-single__content-section">
                      <Col className="col-sm-offset-2 col-sm-8"><p>{devdes.content[key]}</p></Col>
                    </Row>
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className="devdes-single__related">

          <div className="container">
            <h5 className="devdes-single__related-title">Related</h5>
            <Row>
              {
                related && related.slice(0,3).map((d) => {
                  switch (d.type) {
                    case "devlog": return (
                      <Col className="col-xs-12 col-sm-6 col-md-3" key={d.slug}>
                        <DevLogPreviewMini devlog={d}/>
                      </Col>
                    );
                    case "desnote": return (
                      <Col className="col-xs-12 col-sm-6 col-md-3" key={d.slug} >
                        <DesNotesPreviewMini desnote={d}/>
                      </Col>
                    );
                  }
                })
              }
              <Col className="col-xs-12 col-sm-6 col-md-3">
                <Link to={"/logs-and-notes?view=" + d(devdes.type)("viewmore")} className="devdes-more">
                  <div className="devdes-more__text">
                    <h5 className="text-subtitle">View All</h5>
                    <Icon id="icon-right-arrow" className="icon-more-arrow"/>
                  </div>
                </Link>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state, ownProps) => {
  let slug = ownProps.match.params.slug,
    devdes, related;

  devdes = state.logs.find((log) => (log.slug === slug));
  if(devdes) related = state.logs;

  if(!devdes){
    devdes = state.notes.find((log) => (log.slug === slug));
    related = state.notes;
  }

  if(!devdes) devdes = {error: "not found"};

  return {
    devdes,
    related
  };
})(LogNotesPageListSingle);

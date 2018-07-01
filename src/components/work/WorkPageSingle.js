// @flow
import React, { PureComponent } from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {siteMetaActions, userActions} from '../../../state/reducer/rootReducer';
import FunShapes from '../../common/FunShapes';
import Icon from '../../common/Icon';
import Col from '../../common/layout/Col';
import Row from '../../common/layout/Row';
import MockScreen from '../../common/MockScreen';
import RedirectWithStatus from '../../common/RedirectWithStatus';
import {StatusRoute} from '../404/NotFoundPage';
import WorkSingleSection from './PageSingle/WorkSingleSection';
import type {WorkType} from "../../../types/siteTypes";

type PropType = {
  work: WorkType | {error: boolean},
  nextWork: WorkType
};
type StateType = {};

class WorkPageSingle extends PureComponent<PropType, StateType> {
  state = {};
  componentWillMount(){
    this.props.dispatch(siteMetaActions.changeHeroColor("white"))
  }
  componentDidMount(){
    this.confirmRead(this.props);
  }
  componentWillReceiveProps(nextProps){
    this.confirmRead(nextProps);
  }
  confirmRead(props){
    this.props.dispatch(userActions.changeWorksReadStatus(props.work.slug, true))
  }
  anchorClick = (e: SyntheticEvent<HTMLAnchorElement>) => {
    e.currentTarget.blur();
  }
  render(){
    if(this.props.work.error){
      // return <StatusRoute code={404}>
      //   <div className="work-hero">
      //     <h1>Not Found :(</h1>
      //   </div>
      // </StatusRoute>
      return <RedirectWithStatus status={303} to={"/works"} />
    }
    let {work} = this.props;

    return (
      <div className="work-single">
        <div className="work-single__hero" style={{backgroundImage: `url(${work.images.bg})`}}>
          <div className="container">
            <Row>
              <Col className="col-xs-12 col-sm-7">
                <h1>{work.title}</h1>
              </Col>
              <Col className="col-xs-12 col-sm-5">
                <div className="work-single__preview">
                  <p>{work.preview}</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="col-xs-12 col-sm-8 col-sm-offset-2">
                <div className="work-single__hero-mock">
                  <div className="work-single__hero-mock-meta is-right">

                    <div className="work-single__hero-mock-meta-single">
                      <h6>Client</h6>
                      <small>{work.meta.client}</small>
                    </div>
                    <div className="work-single__hero-mock-meta-single">
                      <h6>Scope</h6>
                      <small>{work.meta.scope}</small>
                    </div>
                  </div>
                  <div className="work-single__hero-mock-meta is-left">
                    <div className="work-single__hero-mock-meta-single">
                      <h6>Role</h6>
                      <small>{work.meta.role}</small>

                    </div>
                    <div className="work-single__hero-mock-meta-single">
                      <h6>Release Date</h6>
                      <small>{work.meta.date}</small>
                    </div>
                  </div>
                  <MockScreen backgroundImage={work.images.preview}/>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="work-single__breakdown">
          <FunShapes strokeColor="#E8E2D7" />
          {Object.keys(work.content).map((key, index) => (
            <WorkSingleSection key={key} index={index + 1} title={key} content={work.content[key]} primaryColor={work.primary_color} />
          ))}
        </div>
        <div className="work-single__next">
          <h6 className="work-single__next-thank-you">Thank you for reading</h6>
          <div className="work-single__next-controls">
            <div className="container">
              <Row>
                <Col className="col-xs-12 col-sm-8 col-sm-offset-2">
                  <Link to={"/works/" + this.props.nextWork.slug} onClick={this.anchorClick} className="work-single__next-link" style={{backgroundImage: `url(${this.props.nextWork.images.bg})`}}>
                    <div>
                      <h6>Next Project</h6>
                      <h3>{this.props.nextWork.title}</h3>
                      <Icon id="icon-right-arrow" className="icon-more-arrow" />
                    </div>
                  </Link>
                  <Link to="/works" className="work-single__next-all-projects-link">
                    View All Projects
                    <div>
                      <Icon id="icon-left-arrow" className="icon-more-arrow" />
                    </div>
                  </Link>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state, ownProps)=>{
  let nextWork,
    work = state.works.reduce((curr, work, index) => {
      if(!curr.slug && work.slug === ownProps.match.params.slug){
        curr = work;
        nextWork = (index + 1 >= state.works.length)? state.works[0] : state.works[index + 1];
      }
      return curr;
    }, {});

  if(!work){
    work = {error: true}
  }

  return {
    work,
    nextWork
  }
})(WorkPageSingle);

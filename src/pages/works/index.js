// @flow
import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import FunShapes from '../../components/shared/FunShapes';
import Icon from '../../components/shared/Icon';
import WorkList from '../../components/work/WorkList';

// import {siteMetaActions} from "../../../state/reducer/rootReducer";

// import type {WorkType} from "../../../types/siteTypes";

type PropType = {
  // works: Array<WorkType>,
  user: {/*TODO: Fill this out*/}
};
type StateType = {};

class WorkPageList extends PureComponent<PropType, StateType> {
  state = {};
  // componentWillMount(){
  //   //"#B2727B"
  //   this.props.dispatch(siteMetaActions.changeHeroColor("#66272E"))
  // }
  // componentDidMount(){
  // }
  // componentWillUnmount(){
  // }
  render(){
    return (
      <div className="works">
        <div className="works-hero">
          <FunShapes strokeColor="#E8E2D7" />
          <div className="container is-position">
            <h5 className="works-hero__subtitle">2011 - 2018</h5>
            <h1 className="works-hero__title">Past Works</h1>
            <div className="works-hero__welcome">
              <h6>Love What You Do, Do What You Love</h6>
            </div>
          </div>
          <div className="works-hero__arrow">
            <Icon id="icon-down-arrow"/>
            <Icon id="icon-down-arrow"/>
            <Icon id="icon-down-arrow"/>
          </div>
        </div>
        <section className="works-work-list">
          <WorkList works={this.props.works} user={this.props.user}/>
        </section>
      </div>
    );
  }
}

export default connect((state) => ({
  works: [],
  user: {}
}))(WorkPageList);

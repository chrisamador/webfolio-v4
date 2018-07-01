// @flow
import React, { PureComponent } from "react";
import {connect} from "react-redux";

import Link from 'gatsby-link';
import WorkList from '../work/WorkList';

// import type {WorkType} from '../../../types/siteTypes';

type PropType = {
  // works: Array<WorkType>
};
type StateType = {};

class HomeWorks extends PureComponent<PropType, StateType> {
  state = {};
  render(){
    let works = [...this.props.works].splice(0, 3),
        length = this.props.works.length;

    return (
      <section className="home-works">
        <header className="home-works__header">
          <div className="container">
            <h5 className="text-subtitle">2011 - 2018</h5>
            <h4 className="text-section-title">Past Works</h4>
          </div>
        </header>

        <WorkList works={works} user={this.props.user}/>

        <div className="home-works__view-all">
          <Link to="/works" className="btn btn-primary">View All Works ({length})</Link>
        </div>

      </section>
    );
  }
}

export default connect((state) => ({
  works: [],
  user: {}
}))(HomeWorks);

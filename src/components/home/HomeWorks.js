// @flow
import React, { PureComponent } from "react";

import Link from 'gatsby-link';
import WorkSingle from '../work/WorkSingle';

import {QueryContentWorksType} from "../../pages/index.js";

type PropType = {
  works: QueryContentWorksType
};
type StateType = {};

class HomeWorks extends PureComponent<PropType, StateType> {
  state = {};
  render(){

    let works = [...this.props.works.edges],
        length = this.props.works.totalCount;

    return (
      <section className="home-works">
        <header className="home-works__header">
          <div className="container">
            <h5 className="text-subtitle">2011 - 2018</h5>
            <h4 className="text-section-title">Past Works</h4>
          </div>
        </header>

        {this.props.works.edges.map((work) => (
          <WorkSingle
            key={work.node.fields.slug}
            work={work}
            userWorkMeta={{}}/>
        ))}

        <div className="home-works__view-all">
          <Link to="/works" className="btn btn-primary">View All Works ({length})</Link>
        </div>

      </section>
    );
  }
}

export default HomeWorks;

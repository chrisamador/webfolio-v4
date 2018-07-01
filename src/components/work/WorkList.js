// @flow
import React, { PureComponent } from "react";
import WorkSingle from "./WorkSingle";
// import type {WorkType} from "../../../types/siteTypes";

type PropType = {
  // works: Array<WorkType>,
  user: {/*TODO: Fill this out*/}
};

type StateType = {};

class WorkList extends PureComponent<PropType, StateType> {
  state = {};
  render(){
    return (
      <div>
        {this.props.works.map((work) => (
          <WorkSingle key={work.slug} work={work}
            userWorkMeta={{}}/>
        ))}
      </div>
    );
  }
}

export default WorkList;

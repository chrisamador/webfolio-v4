// @flow
import React, { PureComponent } from "react";

type PropType = {
  children: React.ChildrenArray<*>
};
type StateType = {};

class Col extends PureComponent<PropType, StateType> {
  render(){
    return (
      <div className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}

export default Col;

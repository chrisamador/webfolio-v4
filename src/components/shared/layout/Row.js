// @flow
import React, { PureComponent } from "react";

type PropType = {
  children: React.ChildrenArray<*>
};
type StateType = {};

class Row extends PureComponent<PropType, StateType> {
  render(){
    return (
      <div className={"row" + (this.props.className ? " " + this.props.className : "")}>
        {this.props.children}
      </div>
    );
  }
}

export default Row;

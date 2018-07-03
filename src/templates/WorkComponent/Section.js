// @flow
import React, { PureComponent } from "react";

type PropType = {
  number: string,
  title: string
};
type StateType = {};

class Section extends PureComponent<PropType, StateType> {
  state = {};
  render(){
    return (
      <section className="work-single__section">
        <div className="work-single__section-title-area">
          <div className="work-single__section-number">{this.props.number}</div>
          <h5 className="work-single__section-title">{this.props.title}</h5>
        </div>
        <div className="work-single__section-content">
          {this.props.children}
        </div>
      </section>
    );
  }
}

export let cleanChildren = children => (
  children.reduce((col, child)=>{
    if(typeof child !== 'string'){
      col.push(child);
    }
    return col;
  },[])
) ;

export default Section;

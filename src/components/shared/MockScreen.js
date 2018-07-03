// @flow
import React, { PureComponent } from "react";

type PropType = {
  backgroundImage?: string,
  imageSrc?: string
};
type StateType = {};

class MockScreen extends PureComponent<PropType, StateType> {
  state = {};
  render(){
    let {backgroundImage, imageSrc} = this.props;
    let style = {}, image, className = '';

    if(backgroundImage){
      style = {backgroundImage: `url(${backgroundImage})`};
      className = " is-background-image";
    }

    if(imageSrc && !this.props.children){
      image = (<img className="img-responsive" src={imageSrc} alt=""/> );
      className = ' is-image';
    }

    if(this.props.children){
      image = (
        <div className="mock-screen__image">
          {this.props.children}
        </div>
      );
      className = ' is-image';
    }



    return (
      <div className="mock-screen">
        <div className="mock-screen__top-bar">
          <span></span>
        </div>
        <div className={"mock-screen__screen" + className} style={style}>
          {image}
        </div>
      </div>
    );
  }
}

export default MockScreen;

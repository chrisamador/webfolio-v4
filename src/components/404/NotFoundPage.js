// @flow
import React, { PureComponent } from "react";
import {Route} from "react-router-dom";
type PropType = {};
type StateType = {};

export const StatusRoute = ({ code, children }) => (
  <Route render={({ staticContext }) => {
    if (staticContext)
      staticContext.status = code;
    return children;
  }}/>
);

class NotFoundPage extends PureComponent<PropType, StateType> {
  state = {};
  render(){
    return (
      <StatusRoute code={404}>
        <h1>Not found!</h1>
      </StatusRoute>
    );
  }
}

export default NotFoundPage;

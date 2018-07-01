// @flow
import React, { PureComponent } from "react";
import {Route, Switch} from "react-router-dom";

import WorkPageList from './WorkPageList';
import WorkPageSingle from './WorkPageSingle';

import type {WorkType} from "../../../types/siteTypes";

type PropType = {
  works: Array<WorkType>
};
type StateType = {};

class WorkPage extends PureComponent<PropType, StateType> {
  state = {};
  render(){
    return (
      <Switch>
        <Route exact path={this.props.match.url} component={WorkPageList}/>
        <Route path={`${this.props.match.url}/:slug`} component={WorkPageSingle}/>
      </Switch>
    );
  }
}

export default WorkPage

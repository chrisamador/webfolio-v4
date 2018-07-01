// @flow
import React, { PureComponent } from "react";
import {Route, Switch} from "react-router-dom";

import {siteMetaActions} from "../../../state/reducer/rootReducer";
import LogNotesPageList from './LogNotesPageList';
import LogNotesPageListSingle from './LogNotesPageSingle';

type PropType = {
};

type StateType = {
};

class LogNotesPage extends PureComponent<PropType, StateType> {
  state = {
  };
  render(){
    return (
      <Switch>
        <Route exact path={this.props.match.url} component={LogNotesPageList}/>
        <Route path={`${this.props.match.url}/:slug`} component={LogNotesPageListSingle}/>
      </Switch>
    );
  }
}

export default LogNotesPage

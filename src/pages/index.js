// @flow
import React, { PureComponent } from 'react';
import {connect} from 'react-redux';

import HomeDesNotes from '../components/home/HomeDesNotes';
import HomeDevLogs from '../components/home/HomeDevLogs';
import HomeHero from '../components/home/HomeHero';
import HomeIntro from '../components/home/HomeIntro';
import HomeWorks from '../components/home/HomeWorks';

// import {siteMetaActions} from "../../../state/reducer/rootReducer";

type PropType = {};
type StateType = {};

class HomePage extends PureComponent<PropType, StateType> {
  UNSAFE_componentWillMount(){
    // this.props.dispatch(siteMetaActions.changeHeroColor("white"))
  }
  render(){
    return (
      <div className="home">
        <HomeHero />
        <HomeIntro />
        <HomeWorks />
        <HomeDevLogs devlogs={this.props.devlogs}/>
        <HomeDesNotes desnotes={this.props.desnotes}/>
      </div>
    );
  }
}

export default connect((state) => ({
  devlogs: [],
  desnotes: []
}))(HomePage);

// eslint-disable-next-line
export const query = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

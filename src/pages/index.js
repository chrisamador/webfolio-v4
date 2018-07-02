// @flow
import React, { PureComponent } from 'react';
// import {connect} from 'react-redux';

import HomeDesNotes from '../components/home/HomeDesNotes';
import HomeDevLogs from '../components/home/HomeDevLogs';
import HomeHero from '../components/home/HomeHero';
import HomeIntro from '../components/home/HomeIntro';
import HomeWorks from '../components/home/HomeWorks';

// import {siteMetaActions} from "../../../state/reducer/rootReducer";

type PropType = {
  data: {
    works: QueryContentWorksType,
    logs: QueryContentLogsNotesType,
    notes: QueryContentLogsNotesType
  }
};
type StateType = {};

class HomePage extends PureComponent<PropType, StateType> {
  componentDidMount(){
    // this.props.dispatch(siteMetaActions.changeHeroColor("white"))
  }
  render(){
    // console.log(this.props.data);
    // let devlogs = [], desnotes = [];
    let {logs, notes} = this.props.data;

    return (
      <div className="home">
        <HomeHero />
        <HomeIntro />
        <HomeWorks />
        <HomeDevLogs devlogs={logs}/>
        <HomeDesNotes desnotes={notes}/>
      </div>
    );
  }
}

// export default connect((state) => ({
//   devlogs: [],
//   desnotes: []
// }))(HomePage);

export default HomePage;

// Works type
export type QueryContentWorksType = {
  totalCount: number,
  edges: Array<QueryWorksSingleType>
}

export type QueryWorksSingleType = {
  node: {
    fields: {
      slug: string,
      type: string
    },
    html: string,
    frontmatter: {
      title: string,
      tags: string,
    }
  }
}

// Logs and Notes type
export type QueryContentLogsNotesType = {
  totalCount: number,
  edges: Array<QueryLogsNotesSingleType>
}
export type QueryLogsNotesSingleType = {
  node: {
    html: string,
    fields: {
      slug: string,
      type: 'log' | 'note'
    },
    frontmatter: {
      title: string,
      tags: string,
      image_main: string,
      meta: {
        date: string,
        primary_color: string,
        type_of: string,
        min_read: string,
        exp: string
      }
    }
  }
}

// eslint-disable-next-line
export const query = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
    }
    works: allMarkdownRemark(filter: {fields: {type: {eq: "work"}}}, limit: 3){
      totalCount
      edges{
       node{
         fields{
           slug
           type
         }
         html
         frontmatter{
           title
           tags
         }
       }
     }
    }
    logs: allMarkdownRemark(filter: {fields: {type: {eq: "log"}}}, limit: 3){
      totalCount
      edges{
        node{
          fields{
            slug
            type
          }
          html
          frontmatter{
            title
            tags
            image_main
            meta {
              date
              primary_color
              type_of
              min_read
              exp
            }
          }
        }
      }
    }
    notes: allMarkdownRemark(filter: {fields: {type: {eq: "note"}}}, limit: 3){
      totalCount
       edges{
         node{
           fields{
             slug
             type
           }
           html
           frontmatter{
             title
             tags
             image_main
             meta {
               date
               primary_color
               type_of
               min_read
               exp
             }
           }
         }
       }
    }
  }
`;

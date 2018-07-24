// @flow
import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import FunShapes from '../../components/shared/FunShapes';
import Icon from '../../components/shared/Icon';
import WorkSingle from '../../components/work/WorkSingle';
import Seo from '../../components/shared/Seo';
import {SiteMetaActions} from '../../state/reducers/siteMeta';

import type {QueryContentWorksType} from '../index';

type PropType = {
  // works: Array<WorkType>,
  user: {/*TODO: Fill this out*/},
  data: {
    works: QueryContentWorksType
  }
};
type StateType = {};

class WorkPageList extends PureComponent<PropType, StateType> {
  state = {};
  componentDidMount(){
    this.props.dispatch(SiteMetaActions.updateSiteMetaColor('#66272E'))
  }
  componentWillUnmount(){
  }
  render(){
    return (
      <div className="works">
        <Seo
          title="Works"
          url={this.props.pageResources ? this.props.pageResources.page.path : null}/>
        <div className="works-hero">
          <FunShapes strokeColor="#E8E2D7" />
          <div className="container is-position">
            <h5 className="works-hero__subtitle">2011 - 2018</h5>
            <h1 className="works-hero__title">Past Works</h1>
            <div className="works-hero__welcome">
              <h6>Love What You Do, Do What You Love</h6>
            </div>
          </div>
          <div className="works-hero__arrow">
            <Icon id="icon-down-arrow"/>
            <Icon id="icon-down-arrow"/>
            <Icon id="icon-down-arrow"/>
          </div>
        </div>
        <section className="works-work-list">
          {this.props.data.works.edges.map((work) => (
            <WorkSingle
              key={work.node.fields.slug}
              work={work}/>
          ))}
        </section>
      </div>
    );
  }
}

export default connect(() => ({
}))(WorkPageList);

// eslint-disable-next-line
export const query = graphql`
  query WorkPageQuery {
    works: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {fields: {type: {eq: "work"}}}
      ){
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
           primary_color
           preview
           date
           meta {
             role
             client
             scope
           }
           image_bg {
             childImageSharp {
               sizes(quality: 90) {
                 originalImg
               }
             }
           }
           image_preview {
             childImageSharp {
               sizes(quality: 90) {
                 originalImg
               }
             }
           }
         }
       }
     }
    }
  }
`;

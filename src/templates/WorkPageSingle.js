// @flow
import React, { PureComponent } from 'react';
import Link from 'gatsby-link';
import { connect } from 'react-redux';

import FunShapes from '../components/shared/FunShapes';

import Icon from '../components/shared/Icon';
import Col from '../components/shared/layout/Col';
import Row from '../components/shared/layout/Row';

import MockScreen from '../components/shared/MockScreen';
import Seo from '../components/shared/Seo';

// import WorkSingleSection from './PageSingle/WorkSingleSection';

import {SiteMetaActions} from '../state/reducers/siteMeta';


type PropType = {
  pathContext: {
    slug: string,
    next: MatchedWorkSingleType,
    related: Array<{}>
  },
  data: {
    work: MatchedWorkSingleType
  }
};
type StateType = {};

class WorkPageSingle extends PureComponent<PropType, StateType> {
  state = {};
  // componentWillMount(){
  //   this.props.dispatch(siteMetaActions.changeHeroColor("white"))
  // }
  // componentDidMount(){
  //   this.confirmRead(this.props);
  // }
  // componentWillReceiveProps(nextProps){
  //   this.confirmRead(nextProps);
  // }
  // confirmRead(props){
  //   this.props.dispatch(userActions.changeWorksReadStatus(props.work.frontmatter.slug, true))
  // }
  componentDidMount(){
    this.props.dispatch(SiteMetaActions.updateSiteMetaColor('white'))
  }
  anchorClick = (e: SyntheticEvent<HTMLAnchorElement>) => {
    e.currentTarget.blur();
  }
  render(){
    let {work} = this.props.data;
    let {next} = this.props.pathContext;

    return (
      <div className="work-single">
        <Seo
          title={work.frontmatter.title}
          url={work.fields.slug}
          description={work.excerpt}
          image={work.frontmatter.images.preview}/>
        <div className="work-single__hero" style={{backgroundImage: `url(${work.frontmatter.images.bg})`}}>
          <div className="container">
            <Row>
              <Col className="col-xs-12 col-sm-7">
                <h1>{work.frontmatter.title}</h1>
              </Col>
              <Col className="col-xs-12 col-sm-5">
                <div className="work-single__preview">
                  <p>{work.frontmatter.preview}</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="col-xs-12 col-sm-8 col-sm-offset-2">
                <div className="work-single__hero-mock">
                  <div className="work-single__hero-mock-meta is-right">

                    <div className="work-single__hero-mock-meta-single">
                      <h6>Client</h6>
                      <small>{work.frontmatter.meta.client}</small>
                    </div>
                    <div className="work-single__hero-mock-meta-single">
                      <h6>Scope</h6>
                      <small>{work.frontmatter.meta.scope}</small>
                    </div>
                  </div>
                  <div className="work-single__hero-mock-meta is-left">
                    <div className="work-single__hero-mock-meta-single">
                      <h6>Role</h6>
                      <small>{work.frontmatter.meta.role}</small>

                    </div>
                    <div className="work-single__hero-mock-meta-single">
                      <h6>Release Date</h6>
                      <small>{work.frontmatter.meta.date}</small>
                    </div>
                  </div>
                  <MockScreen backgroundImage={work.frontmatter.images.preview}/>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="work-single__breakdown">
          <FunShapes strokeColor="#E8E2D7" />

        </div>
        <div className="work-single__next">
          <h6 className="work-single__next-thank-you">Thank you for reading</h6>
          <div className="work-single__next-controls">
            <div className="container">
              <Row>
                <Col className="col-xs-12 col-sm-8 col-sm-offset-2">
                  <Link to={next.fields.slug} onClick={this.anchorClick} className="work-single__next-link" style={{backgroundImage: `url(${next.frontmatter.images.bg})`}}>
                    <div>
                      <h6>Next Project</h6>
                      <h3>{next.frontmatter.title}</h3>
                      <Icon id="icon-right-arrow" className="icon-more-arrow" />
                    </div>
                  </Link>
                  <Link to="/works" className="work-single__next-all-projects-link">
                    View All Projects
                    <div>
                      <Icon id="icon-left-arrow" className="icon-more-arrow" />
                    </div>
                  </Link>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(() => ({
}))(WorkPageSingle);

export type MatchedWorkSingleType = {
  html: string,
  excerpt: string,
  fields: {
    slug: string,
    type: 'log' | 'note'
  },
  frontmatter: {
    title: string,
    primary_color: string,
    preview: string,
    meta: {
      role: string,
      date: string,
      client: string,
      scope: string
    },
    images: {
      bg: string,
      preview: string,
    }
  }
}

// eslint-disable-next-line
export const query = graphql`
  query WorkPageSingleQuery($slug: String!) {
    work: markdownRemark(fields: { slug: { eq: $slug } }) {
      fields{
        slug
        type
      }
      excerpt
      html
      frontmatter{
        title
        primary_color
        preview
        meta {
          role
          date
          client
          scope
          read
          percent_read
        }
        images {
          bg
          preview
        }
      }
    }
  }
`;

// {Object.keys(work.frontmatter.content).map((key, index) => (
//   <WorkSingleSection key={key} index={index + 1} title={key} content={work.frontmatter.content[key]} primaryColor={work.frontmatter.primary_color} />
// ))}

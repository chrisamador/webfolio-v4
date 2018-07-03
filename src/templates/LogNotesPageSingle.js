// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Link from 'gatsby-link';

import Icon from '../components/shared/Icon';
import Col from '../components/shared/layout/Col';
import Row from '../components/shared/layout/Row';

import DesNotesPreviewMini from '../components/lognotes/previews/DesnotePreviewMini';
import DevLogPreviewMini from '../components/lognotes/previews/DevlogPreviewMini';
import Seo from '../components/shared/Seo';
import dateFormater from '../components/shared/ults/dateFormater';

import FunShapes from '../components/shared/FunShapes';

import {SiteMetaActions} from '../state/reducers/siteMeta';

const ref = {
  logo_subtitle: {
    log: () => ('Dev + How Tos + Thoughts'),
    note: () => ('Desing + How Tos + Thoughts')
  },
  logo_title: {
    log: () => 'Logs',
    note: () => 'Notes'
  },
  viewmore: {
    log: () => 'logs',
    note: () => 'notes'
  },
  heroTitle: {
    log: function heroTitle ({title, date}) {
      return (
        <Row>
          <Col className="col-sm-7">
            <div className="devdes-single__dev-title">
              <h1>{title}</h1>
              <h6>{date}</h6>
            </div>
          </Col>
        </Row>

      );
    },
    note: function heroTitle ({title, date}) {
      return (
        <div className="devdes-single__des-title">
          <h1>{title}</h1>
          <h6><div>{date}</div></h6>
        </div>

      );
    },
  },
};

const d = (type) => (item, opts) => {
  try{
    return ref[item][type](opts);

  }catch(error){
    console.error(error);
  }
};

type PropType = {
  pathContext: {
    slug: string,
    next: {},
    related: Array<{node: MatchedLogsNotesSingleType}>
  },
  data: {
    devdes: MatchedLogsNotesSingleType
  }
};
type StateType = {};

class LogNotesPageListSingle extends PureComponent<PropType, StateType> {
  state = {};
  // componentWillMount(){
  //   this.props.dispatch(siteMetaActions.changeHeroColor("#66272E"));
  // }
  // componentDidMount(){
  //   this.confirmRead(this.props);
  // }
  // componentWillReceiveProps(nextProps){
  //   this.confirmRead(nextProps);
  // }
  componentDidMount(){
    this.props.dispatch(SiteMetaActions.updateSiteMetaColor('#66272E'))
  }
  confirmRead(props){
    let action;
    switch (props.data.devdes.fields.type) {
      case 'log':
        action = userActions.changeLogsReadStatus(props.devdes.slug, true);
        break;
      case 'note':
        action = userActions.changeNotesReadStatus(props.devdes.slug, true);
        break;
    }
    if(action) this.props.dispatch(action);
  }
  render(){
    let {devdes} = this.props.data;
    let {related} = this.props.pathContext;
    let formatDate = dateFormater(devdes.frontmatter.date);
    // debugger;
    return (
      <div className={'devdes-single is-' + devdes.fields.type + " is-color-" + devdes.frontmatter.meta.primary_color}>
        <Seo
          title={devdes.frontmatter.title}
          url={devdes.fields.slug}
          description={devdes.excerpt}
          image={devdes.frontmatter.image_main}/>
        <FunShapes strokeColor="#E8E2D7" style={{zIndex: -1}}/>
        <div className="devdes-single__logo">
          <Link to="/logs-notes" className="devdes-logo">
            <div className="devdes-logo__subtitle">{d(devdes.fields.type)("logo_subtitle")}</div>
            <div className="devdes-logo__title">{d(devdes.fields.type)("logo_title")}</div>
          </Link>
        </div>
        <div className="devdes-single__hero">
          <div className="container is-position">
            {d(devdes.fields.type)('heroTitle', {
              title: devdes.frontmatter.title,
              date: formatDate
            })}
            { devdes.fields.type === 'log' &&
              (devdes.frontmatter.images.main_id
                ? (<div>
                  <Icon id={devdes.frontmatter.images.type_id} className="icon-devlog" style={{top: 50, right: 100}}/>
                  <Icon id={devdes.frontmatter.images.main_id} className="icon-devlog-large" style={{top: 60, right: 100}}/>
                </div>
                )
                :(
                  <Icon id={devdes.node.frontmatter.images.type_id} className="icon-devlog" style={{top: 50, right: 100}}/>
                ))
            }
          </div>

        </div>
        <div className="devdes-single__meta">
          <div className="container">
            <div className="devdes-meta">
              <Row>
                <Col className="col-sm-offset-1 col-sm-10">
                  <Row>
                    <Col className="col-xs-6 col-sm-3">
                      <div className="devdes-meta__single">
                        <h6>Typeof</h6>
                        <h5>{devdes.frontmatter.meta.type_of}</h5>
                      </div>
                    </Col>
                    <Col className="col-xs-6 col-sm-3">
                      <div className="devdes-meta__single">
                        <h6>Minute Read</h6>
                        <h5>{devdes.frontmatter.meta.min_read}</h5>
                      </div>
                    </Col>
                    <Col className="col-xs-6 col-sm-3">
                      <div className="devdes-meta__single">
                        <h6>Topic</h6>
                        <h5>{devdes.frontmatter.tags[0]}</h5>
                      </div>
                    </Col>
                    <Col className="col-xs-6 col-sm-3">
                      <div className="devdes-meta__single">
                        <h6>Min Exp</h6>
                        <h5>{devdes.frontmatter.meta.exp}</h5>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <div className="devdes-single__content">
          <div className="container">
            <div className={'devdes-single__content-inner is-' + devdes.fields.type}>
              <div className="devdes-single__content-section">
                <Row>
                  <Col className="col-sm-offset-1 col-sm-10">
                    <div dangerouslySetInnerHTML={{__html: devdes.html}}></div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
        <div className="devdes-single__related">

          <div className="container">
            <h5 className="devdes-single__related-title">Related</h5>
            <Row>
              {
                related && related.slice(0,3).map((edge) => {
                  switch (edge.node.fields.type) {
                    case 'log': return (
                      <Col className="col-xs-12 col-sm-6 col-md-3" key={edge.node.fields.slug}>
                        <DevLogPreviewMini devlog={edge}/>
                      </Col>
                    );
                    case 'note': return (
                      <Col className="col-xs-12 col-sm-6 col-md-3" key={edge.node.fields.slug} >
                        <DesNotesPreviewMini desnote={edge}/>
                      </Col>
                    );
                  }
                })
              }
              <Col className="col-xs-12 col-sm-6 col-md-3">
                <Link to={"/logs-notes?view=" + d(devdes.fields.type)("viewmore")} className="devdes-more">
                  <div className="devdes-more__text">
                    <h5 className="text-subtitle">View All</h5>
                    <Icon id="icon-right-arrow" className="icon-more-arrow"/>
                  </div>
                </Link>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(() => ({
}))(LogNotesPageListSingle);

export type MatchedLogsNotesSingleType = {
  html: string,
  excerpt: string,
  fields: {
    slug: string,
    type: 'log' | 'note'
  },
  frontmatter: {
    title: string,
    tags: string,
    images: {
      main_url: string,
      main_id: string,
      type_id: string,
    },
    date: string,
    meta: {
      primary_color: string,
      type_of: string,
      min_read: string,
      exp: string
    }
  }
}

// eslint-disable-next-line
export const query = graphql`
  query LogNotesPageListSingleQuery($slug: String!) {
    devdes: markdownRemark(fields: { slug: { eq: $slug } }) {
      fields{
        slug
        type
      }
      html
      excerpt
      frontmatter{
        title
        tags
        date
        images {
          main_url
          main_id
          type_id
        }
        meta {
          primary_color
          type_of
          min_read
          exp
        }
      }
    }
  }
`;

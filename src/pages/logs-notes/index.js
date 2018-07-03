// @flow
import React, { PureComponent } from "react";
import { connect } from 'react-redux';

// import queryString from "query-string";

import Seo from '../../components/shared/Seo';
import {SiteMetaActions} from '../../state/reducers/siteMeta';
import FunShapes from '../../components/shared/FunShapes';
import Col from '../../components/shared/layout/Col';
import Row from '../../components/shared/layout/Row';

import DesNotesPreview from '../../components/lognotes/previews/DesnotePreview';
import DesNotesPreviewMini from '../../components/lognotes/previews/DesnotePreviewMini';
import DevLogPreview from '../../components/lognotes/previews/DevlogPreview';
import DevLogPreviewMini from '../../components/lognotes/previews/DevlogPreviewMini';

import type {QueryContentLogsNotesType} from '../index';

type PropType = {
  data: {
    logs: QueryContentLogsNotesType,
    notes: QueryContentLogsNotesType
  }
};

type StateType = {
  view: "both" | "logs" | "notes"
};

class LogNotesPageList extends PureComponent<PropType, StateType> {
  state = {
    view: 'both'
  };
  // componentWillMount(){
  //   this.props.dispatch(siteMetaActions.changeHeroColor("#66272E"));
  //   this.checkView(this.props);
  // }
  // componentWillReceiveProps(nextProps){
  //   if (this.props.location !== nextProps.location) {
  //     this.checkView(nextProps);
  //   }
  // }
  componentDidMount(){
    this.props.dispatch(SiteMetaActions.updateSiteMetaColor('#66272E'))
  }
  checkView = (props) => {
    // let view = queryString.parse(props.location.search).view;
    this.setState({
      view: view ? view : "both"
    })
  }
  handleChangeView = (view) => (ev) => {
    ev.currentTarget.blur();
    this.setState({view});
  }
  render(){
    let list;//: Array<DesNotesType> | Array<DevLogType>;

    switch (this.state.view) {
      case 'both':
        list = [...this.props.data.logs.edges, ...this.props.data.notes.edges];
        list.sort((a,b)=>{
          return (
            new Date(b.node.frontmatter.date).getTime()
            - new Date(a.node.frontmatter.date).getTime())
        });
        break;
      case 'logs':
        list = this.props.data.logs.edges;
        break;
      case 'notes':
        list = this.props.data.notes.edges;
        break;
    }
    return (
      <div className="devdes">
        <Seo
          title="Logs & Note"
          url={this.props.pageResources ? this.props.pageResources.page.path : null}/>
        <FunShapes strokeColor="#E8E2D7" />
        <div className="devdes__hero">
          <div className="container ">
            <Row className="devdes__hero-logos text-center">
              <Col className="col-xs-12 col-sm-6">
                <div className="devdes-logo">
                  <div className="devdes-logo__subtitle">Dev + How Tos + Thoughts</div>
                  <div className="devdes-logo__title">Logs</div>
                </div>
              </Col>
              <Col className="col-xs-12 col-sm-6">
                <div className="devdes-logo">
                  <div className="devdes-logo__subtitle">Design + How Tos + Thoughts</div>
                  <div className="devdes-logo__title">Notes</div>
                </div>
              </Col>
            </Row>
            <p className="devdes__hero-intro"><strong>Logs (Development Logs)</strong> and <strong>Notes (Design Notes)</strong> are my thoughts on all things related to the development and design process. Occasionally I share things about build processes, tooling, javascript, productivity, design trends, design tools, design patterns, and anything interesting enough to share. </p>
            <div className="devdes__hero-options text-center">
              <button
                className={"btn btn-ghost" + (this.state.view === "both"? " is-active": "")}
                onClick={this.handleChangeView("both")}>Both ({this.props.data.logs.totalCount + this.props.data.notes.totalCount})</button>
              <div className="u-sm-d-ib u-sm-ml-s"> <button
                className={"btn btn-ghost" + (this.state.view === "logs"? " is-active": "")}
                onClick={this.handleChangeView("logs")}>Logs ({this.props.data.logs.totalCount}) </button>
              <button
                className={"btn btn-ghost" + (this.state.view === "notes"? " is-active": "")}
                onClick={this.handleChangeView("notes")}>Notes ({this.props.data.notes.totalCount}) </button>
              </div>
            </div>
          </div>
        </div>
        <div className="devdes__list">
          <div className="container">
            <Row>
              {
                list && list.slice(0, 6).map((d) => {
                  switch (d.node.fields.type) {
                    case 'log': return (
                      <Col className="col-xs-12 col-sm-4" key={d.node.fields.slug}>
                        <DevLogPreview devlog={d}/>
                      </Col>
                    );
                    case 'note': return (
                      <Col className="col-xs-12 col-sm-4" key={d.node.fields.slug} >
                        <DesNotesPreview desnote={d}/>
                      </Col>
                    );
                  }
                })
              }
            </Row>
            <Row>
              {
                list && list.slice(6).map((d) => {
                  switch (d.node.fields.type) {
                    case 'log': return (
                      <Col className="col-xs-12 col-sm-3" key={d.node.fields.slug}>
                        <DevLogPreviewMini devlog={d}/>
                      </Col>
                    );
                    case 'note': return (
                      <Col className="col-xs-12 col-sm-3" key={d.node.fields.slug} >
                        <DesNotesPreviewMini desnote={d}/>
                      </Col>
                    );
                  }
                })
              }
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(() => ({
}))(LogNotesPageList);

// eslint-disable-next-line
export const query = graphql`
  query WorkQuery {
    logs: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {fields: {type: {eq: "log"}}}
      limit: 3
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
            tags
            images {
              main_url
              main_id
              type_id
            }
            date
            meta {
              primary_color
              type_of
              min_read
              exp
            }
          }
        }
      }
    }
    notes: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {fields: {type: {eq: "note"}}}
      limit: 3
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
             tags
             images {
               main_url
               main_id
               type_id
             }
             date
             meta {
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

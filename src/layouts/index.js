// @flow
import React, { PureComponent } from 'react';
import {connect} from 'react-redux';

import {SiteMetaActions} from '../state/reducers/siteMeta';

import Header from './header/Header';
import Footer from './footer/Footer';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import '../styles/app.less';
import Symbols from '-!svg-react-loader!../assets/icons/symbols.svg';

import siteConfig from '../siteConfig';

type PropType = {
  navColor: string,
  data: {
    site: {
      siteMetadata: {
        title: string
      },
    },
    works: {
      totalCount: number
    },
    notes: {
      totalCount: number
    },
    logs: {
      totalCount: number
    }
  }
};
type StateType = {};

let {meta} = siteConfig;

class Main extends PureComponent<PropType, StateType> {
  state = {};
  render(){
    let {children} = this.props;
    return (
      <div className="app">
        <Helmet>
          {/* General */}
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
          <meta name="image" content={meta.siteImage} />
          {/* Open Graph */}
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={meta.title} />
          <meta property="og:description" content={meta.description} />
          <meta property="og:url" content={meta.siteUrl} />
          <meta property="og:site_name" content={meta.siteName} />
          <meta property="og:image" content={meta.siteImage} />
          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:description" content={meta.description} />
          <meta name="twitter:title" content={meta.title} />
          <meta name="twitter:image" content={meta.siteImage} />
          {/* Links */}
          <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,700i|PT+Mono" rel="stylesheet"/>
          {/* favicons */}
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
          <meta name="theme-color" content="#ffffff" />
          {/* Google */}
          <meta name="google-site-verification" content="zgnZ3tSisVlLfT6lVQHGeKkS2KKZXpypcq-qNd3BDMw" />
        </Helmet>
        {Symbols ? <Symbols className="hidden-svg" /> : null}
        <Header
          numLogs={this.props.data.logs.totalCount}
          numNotes={this.props.data.notes.totalCount}
          numWorks={this.props.data.works.totalCount} />
        <div id="page" className="page page--in-view">
          <div className="page__logo-area">
            <Link to="/">
              <h6 className="page__logo-text" style={{color: this.props.navColor}}>
                <span>Creative</span> Front-End Developer
              </h6>
            </Link>
          </div>
          {children()}
        </div>
        <Footer
          numLogs={this.props.data.logs.totalCount}
          numNotes={this.props.data.notes.totalCount}
          numWorks={this.props.data.works.totalCount}/>
      </div>
    );
  }
}

export default connect((state) => ({
  navColor: state.siteMeta.navColor,
}))(Main);

// eslint-disable-next-line
export const query = graphql`
  query MainLayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
    works: allMarkdownRemark(filter: {fields: {type: {eq: "work"}}}, limit: 3){
      totalCount
    }
    logs: allMarkdownRemark(filter: {fields: {type: {eq: "log"}}}, limit: 3){
      totalCount
    }
    notes: allMarkdownRemark(filter: {fields: {type: {eq: "note"}}}, limit: 3){
      totalCount
    }
  }
`;

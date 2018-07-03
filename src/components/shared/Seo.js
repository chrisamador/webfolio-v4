// @flow
import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import siteConfig from '../../siteConfig';

let {meta} = siteConfig;

type PropType = {
  title: string,
  url?: string,
  description?: string,
  image?: string
};
type StateType = {};


class Seo extends PureComponent<PropType, StateType> {
  state = {};
  render(){
    let {description, image, url} = this.props;
    return (
      <Helmet>
        {/* General */}
        <title>{ this.props.title + ' - ' + meta.title} </title>
        {description && <meta name="description" content={description}/> }
        {image && <meta name="image" content={image} /> }
        {/* Open Graph */}
        <meta property="og:title" content={this.props.title} />
        <meta property="og:url" content={meta.siteUrl + (url ? url : '')} />
        {description && <meta property="og:description" content={description} /> }
        {image && <meta property="og:image" content={image} /> }
        {/* Twitter */}
        <meta name="twitter:title" content={this.props.title} />
        {description && <meta name="twitter:description" content={description} /> }
        {image && <meta name="twitter:image" content={image} /> }
      </Helmet>
    );
  }
}

export default Seo;

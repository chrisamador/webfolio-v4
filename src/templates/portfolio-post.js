import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps() {
  return {};
}

class PortfolioPost extends Component {
  render() {
    let {title, tags, fields} = this.props.data.portfolioJson;
    console.log(this.props);

    return (
      <div>
        Portfolio post: {title}
        tags: {tags.map(tag => (<span key={tag}>-{tag}-</span>))}
      </div>
    );
  }
}

export default connect(mapStateToProps)(PortfolioPost);

// eslint-disable-next-line
export const query = graphql`
  query PortfolioPostQuery($slug: String!) {
    portfolioJson(fields: { slug: { eq: $slug } }) {
      fields{
        slug
      },
      title,
      tags
    }
  }
`;

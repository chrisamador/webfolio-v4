import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps() {
  return {};
}

class BlogPost extends Component {
  render() {
    // eslint-disable-next-line
    const post = this.props.data.markdownRemark;
    return (
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(BlogPost);

// eslint-disable-next-line
export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

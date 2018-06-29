import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'gatsby-link';

class BlogPage extends Component {
  render() {
    return (
      <div>
        <h1>Blog</h1>
        {this.props.data.allMarkdownRemark.edges.map((edge)=> (
          <div key={edge.node.fields.slug}>
            <Link to={edge.node.fields.slug}>{edge.node.frontmatter.title}</Link>
            <hr/>
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps() {
  return {

  };
}
export default connect(
  mapStateToProps
)(BlogPage);

// eslint-disable-next-line
export const query = graphql`
  query BlogQuery {
    allMarkdownRemark{
      edges{
        node{
          frontmatter{
            title,
            subTitle
          },
          fields{
            slug
          }
        }
      }
    }
  }
`;

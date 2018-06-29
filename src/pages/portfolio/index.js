import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'gatsby-link';

function mapStateToProps() {
  return {

  };
}

class PortfolioPage extends Component {
  render() {
    return (
      <div>
        <h1>Portfolio</h1>
        {this.props.data.allPortfolioJson.edges.map((edge)=> (
          <div key={edge.node.fields.slug}>
            <Link to={edge.node.fields.slug}>{edge.node.title}</Link>
            <hr/>
          </div>
        ))}
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(PortfolioPage);

// eslint-disable-next-line
export const query = graphql`
  query PortfolioQuery {
    allPortfolioJson{
      edges{
        node{
          title,
          tags,
          fields{
            slug
          }
        }
      }
    }
  }
`;

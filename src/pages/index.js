import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps() {
  return {

  };
}

class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>Homepage!</h1>
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(HomePage);

// eslint-disable-next-line
export const query = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

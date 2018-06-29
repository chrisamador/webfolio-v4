import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps() {
  return {

  };
}

class HomePage extends Component {
  render() {
    return (
      <div className="home">
        <h1>Homepage Dude</h1>
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

import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps() {
  return {

  };
}

class AboutPage extends Component {
  render() {
    return (
      <div>
        <h1>About</h1>
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(AboutPage);

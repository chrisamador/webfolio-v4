import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import Link from 'gatsby-link';

function mapStateToProps() {
  return {

  };
}

class Footer extends PureComponent {
  render() {
    return (
      <footer>
        Footer
      </footer>
    );
  }
}

export default connect(
  mapStateToProps
)(Footer);

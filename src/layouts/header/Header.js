import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'gatsby-link';

function mapStateToProps() {
  return {

  };
}

const ListLink = ({to, children}) =>
  <Link style={{display: "inline-block", marginRight: 20}} to={to}>{children}</Link>

class Header extends Component {
  render() {
    return (
      <header>
        <ListLink to="/">Home</ListLink>
        <ListLink to="/blog">Blog</ListLink>
        <ListLink to="/portfolio">Portfolio</ListLink>
        <ListLink to="/about">About</ListLink>
        <ListLink to="/contact">Contact</ListLink>

      </header>
    );
  }
}

export default connect(
  mapStateToProps
)(Header);

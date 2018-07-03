// @flow
import React, { PureComponent } from 'react';
import Icon from '../../components/shared/Icon';
import Link from 'gatsby-link';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

type PropType = {
  navColor: string,
  numWorks: number,
  numLogs: number,
  numNotes: number,
};
type StateType = {
  floatingNavActive: boolean,
  hasScrolled: boolean
};

class Header extends PureComponent<PropType, StateType> {
  state = {
    floatingNavActive: false,
    hasScrolled: false,
  };
  componentDidMount(){
    this.headerScroll();
    window.addEventListener('scroll', this.headerScroll);
  }
  headerScroll = () => {
    if(!this.state.hasScrolled && window.pageYOffset > 100){
      this.setState({
        hasScrolled: true,
      });
    }else if (window.pageYOffset < 100){
      this.setState({
        hasScrolled: false,
      });
    }
  }
  anchorClick = e => {
    e.currentTarget.blur();
    this.setState({
      floatingNavActive: false,
    });
  };
  handleNavClick = e => {
    e.currentTarget.blur();
    e.preventDefault();

    //document.body.classList.toggle("has-floating-nav-active");
    this.setState(prevState => ({
      floatingNavActive: !prevState.floatingNavActive,
    }));
  };
  render() {
    let { navColor, numLogs, numWorks, numNotes } = this.props;

    return (
      <header
        className={
          'nav-header' +
          (this.state.floatingNavActive ? ' has-floating-nav-active' : '') +
          (this.state.hasScrolled ? ' has-scrolled' : '')
        }>
        <div className="nav-header__logo">
          <Link to="/">
            <Icon id="icon-logo" className="icon-logo" fill={navColor} />
          </Link>
          <h6 className="nav-header__logo-text">
            Creative Front-End Developer
          </h6>
        </div>
        <nav className="nav-header__nav-list">
          <ul className="primary-nav" style={{ color: navColor }}>
            <li>
              <Link
                to="/"
                exact
                onClick={this.anchorClick}
                activeClassName="active">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/works"
                exact
                onClick={this.anchorClick}
                activeClassName="active">
                Works <sup>{numWorks}</sup>
              </Link>
            </li>
            <li>
              <Link
                to="/logs-notes"
                onClick={this.anchorClick}
                activeClassName="active">
                Logs & Notes <sup>{numLogs + numNotes}</sup>
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                exact
                onClick={this.anchorClick}
                activeClassName="active">
                About
              </Link>
            </li>
            <li>
              <a href="#" onClick={this.anchorClick}>
                Contact
              </a>
            </li>
          </ul>
        </nav>
        <div className="nav-header__floating-nav">
          <a
            className="nav-header__nav-btn-link"
            href="#"
            onClick={this.handleNavClick}>
            <span className="nav-header__nav-cover" />
            <span className="nav-header__nav-btn">
              <span />
              <span />
              <span />
            </span>
            <h6>{this.state.floatingNavActive ? 'Close' : 'Menu'}</h6>
          </a>
        </div>
      </header>
    );
  }
}

export default withRouter(connect((state)=>({
  navColor: state.siteMeta.navColor,
}))(Header));

// @flow
import React, { PureComponent } from 'react';
import Icon from '../../components/shared/Icon';
import Link from 'gatsby-link';
import { withRouter } from 'react-router-dom';
type PropType = {
  heroColor: string,
  numWorks: number,
  numLogs: number,
  numNotes: number,
};
type StateType = {
  floatingNavActive: false,
};

class Header extends PureComponent<PropType, StateType> {
  state = {};
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
    let { heroColor, numLogs, numWorks, numNotes } = this.props;
    if (!heroColor) heroColor = 'white';
    if (!numLogs) numLogs = 99;
    if (!numWorks) numWorks = 99;
    if (!numNotes) numNotes = 99;

    return (
      <header
        className={
          'nav-header' +
          (this.state.floatingNavActive ? ' has-floating-nav-active' : '')
        }>
        <div className="nav-header__logo">
          <Link to="/">
            <Icon id="icon-logo" className="icon-logo" fill={heroColor} />
          </Link>
          <h6 className="nav-header__logo-text">
            Creative Front-End Developer
          </h6>
        </div>
        <nav className="nav-header__nav-list">
          <ul className="primary-nav" style={{ color: heroColor }}>
            <li>
              <Link
                to="/"
                exact
                onClick={this.anchorClick}
                activeClassName="active">
                Home
              </Link>{' '}
            </li>
            <li>
              <Link
                to="/works"
                exact
                onClick={this.anchorClick}
                activeClassName="active">
                Works <sup>{numWorks}</sup>{' '}
              </Link>
            </li>
            <li>
              <Link
                to="/logs-and-notes"
                onClick={this.anchorClick}
                activeClassName="active">
                Logs & Notes <sup>{numLogs + numNotes}</sup>{' '}
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

export default withRouter(Header);

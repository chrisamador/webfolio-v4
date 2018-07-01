// @flow
// import type {DevLogType} from "../../../../types/siteTypes";

import React, { PureComponent } from "react";
import Link from 'gatsby-link';
import Icon from "../../shared/Icon";
import dateFormater from "../../shared/ults/dateFormater";

type PropType = {
  // devlog: DevLogType
};
type StateType = {};



class DevLogPreview extends PureComponent<PropType, StateType> {
  state = {};
  render(){
    let {devlog} = this.props;
    if(!devlog) devlog = {title: 'Test', tags: [], meta: {date: {}}, images: {type: 'react'}}
    let formatDate = dateFormater(devlog.meta.date);
    return (
      <Link to={`/logs-and-notes/${devlog.slug}`} className={"devlog-preview is-color-" + devlog.meta.primary_color}>
        <div className="devlog-preview__inner">
          <div className="devlog-preview__meta">
            {
              devlog.tags.map((tag) => (
                <span className="h6" key={tag}>#{tag}</span>
              ))
            }
          </div>
          <div className="devlog-preview__images">
            {
              devlog.images.main_id
                ? (<div>
                  <Icon id={devlog.images.type} className="icon-devlog" style={{top: 50, left: -30}}/>
                  <Icon id={devlog.images.main_id} className="icon-devlog-large" style={{top: 60, right: 10}}/>
                </div>
                )
                :(
                  <Icon id={devlog.images.type} className="icon-devlog" style={{top: 50, left: -30}}/>
                )
            }
          </div>
          <div className="devlog-preview__title-box">
            <h3>{devlog.title}</h3>
            <h6>{formatDate}</h6>
          </div>
          {/* <div className="devlog-preview__read-progress">
            <h6>{devlog.meta.percent_read * 100}% Complete</h6>
          </div> */}
        </div>
      </Link>
    );
  }
}

export default DevLogPreview;

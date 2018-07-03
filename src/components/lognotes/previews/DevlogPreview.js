// @flow
// import type {DevLogType} from "../../../../types/siteTypes";

import React, { PureComponent } from "react";
import Link from 'gatsby-link';
import Icon from "../../shared/Icon";
import dateFormater from "../../shared/ults/dateFormater";

import type {QueryLogsNotesSingleType} from '../../../pages/index';

type PropType = {
  devlog: QueryLogsNotesSingleType
};
type StateType = {};

class DevLogPreview extends PureComponent<PropType, StateType> {
  state = {};
  render(){
    let {devlog} = this.props;
    if(!devlog);
    let formatDate = dateFormater(devlog.node.frontmatter.date);
    return (
      <Link to={devlog.node.fields.slug} className={"devlog-preview is-color-" + devlog.node.frontmatter.meta.primary_color}>
        <div className="devlog-preview__inner">
          <div className="devlog-preview__meta">
            {
              devlog.node.frontmatter.tags.map((tag) => (
                <span className="h6" key={tag}>#{tag}</span>
              ))
            }
          </div>
          <div className="devlog-preview__images">
            {
              devlog.node.frontmatter.images.main_id
                ? (<div>
                  <Icon id={devlog.node.frontmatter.images.type_id} className="icon-devlog" style={{top: 50, left: -30}}/>
                  <Icon id={devlog.node.frontmatter.images.main_id} className="icon-devlog-large" style={{top: 60, right: 10}}/>
                </div>
                )
                :(
                  <Icon id={devlog.node.frontmatter.images.type_id} className="icon-devlog" style={{top: 50, left: -30}}/>
                )
            }
          </div>
          <div className="devlog-preview__title-box">
            <h3>{devlog.node.frontmatter.title}</h3>
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

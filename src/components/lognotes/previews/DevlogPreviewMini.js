// @flow
import type {DevLogType} from '../../../../types/siteTypes';

import React, { PureComponent } from "react";
import Link from 'gatsby-link';
import Icon from "../../shared/Icon";
import dateFormater from "../../shared/ults/dateFormater";

type PropType = {
  devlog: DevLogType
};
type StateType = {};

class DevlogPreviewMini extends PureComponent<PropType, StateType> {
  state = {};
  render(){
    let {devlog} = this.props;
    let formatDate = dateFormater(devlog.meta.date);
    return (
      <Link to={`/logs-and-notes/${devlog.slug}`} className={"devlog-preview-mini is-color-" + devlog.meta.primary_color}>
        <div className="devlog-preview-mini__inner">
          <div className="devlog-preview-mini__meta">
          </div>
          <div className="devlog-preview__images">
            <Icon id={devlog.images.type} className="icon-devlog-mini" style={{top: 15, left: "50%", transform: "translateX(-50%)"}}/>
          </div>
          <div className="devlog-preview-mini__title-box">
            <h3>{devlog.title}</h3>
            <h6>{formatDate}</h6>
          </div>
        </div>
      </Link>
    );
  }
}

export default DevlogPreviewMini;

// @flow
import React, { PureComponent } from "react";
import Link from 'gatsby-link';
import Icon from "../../shared/Icon";
import dateFormater from "../../shared/ults/dateFormater";

import type {QueryLogsNotesSingleType} from '../../../pages/index';

type PropType = {
  devlog: QueryLogsNotesSingleType
};
type StateType = {};

class DevlogPreviewMini extends PureComponent<PropType, StateType> {
  state = {};
  render(){
    let {devlog} = this.props;
    let formatDate = dateFormater(devlog.node.frontmatter.meta.date);

    return (
      <Link to={devlog.node.fields.slug} className={"devlog-preview-mini is-color-" + devlog.node.frontmatter.meta.primary_color}>
        <div className="devlog-preview-mini__inner">
          <div className="devlog-preview-mini__meta">
          </div>
          <div className="devlog-preview__images">
            <Icon id="icon-logo-react" className="icon-devlog-mini" style={{top: 15, left: "50%", transform: "translateX(-50%)"}}/>
          </div>
          <div className="devlog-preview-mini__title-box">
            <h3>{devlog.node.frontmatter.title}</h3>
            <h6>{formatDate}</h6>
          </div>
        </div>
      </Link>
    );
  }
}

export default DevlogPreviewMini;

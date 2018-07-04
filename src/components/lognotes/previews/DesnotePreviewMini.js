// @flow
import React, { PureComponent } from "react";
import Link from 'gatsby-link';
// import type {DesNotesType} from '../../../../types/siteTypes';
import dateFormater from '../../shared/ults/dateFormater';

import type {QueryLogsNotesSingleType} from '../../../pages/index';

type PropType = {
  // single: DesNotesType
  single: QueryLogsNotesSingleType
};
type StateType = {};

class DesNotesPreviewMini extends PureComponent<PropType, StateType> {
  state = {};
  render(){
    let {single} = this.props;
    let formatDate = dateFormater(single.node.frontmatter.date);

    return (
      <Link to={single.node.fields.slug} className={"desnotes-preview-mini is-color-" + single.node.frontmatter.meta.primary_color}
        style={{backgroundImage: `url(${single.node.frontmatter.images.main_url})`}}>
        <div className="desnotes-preview-mini__title-box">
          <h3>{single.node.frontmatter.title}</h3>
          <h6>{formatDate}</h6>
        </div>
      </Link>
    );
  }
}

export default DesNotesPreviewMini;

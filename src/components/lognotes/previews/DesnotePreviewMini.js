// @flow
import React, { PureComponent } from "react";
import Link from 'gatsby-link';
// import type {DesNotesType} from '../../../../types/siteTypes';
import dateFormater from '../../shared/ults/dateFormater';

import type {QueryLogsNotesSingleType} from '../../../pages/index';

type PropType = {
  // desnote: DesNotesType
  desnote: QueryLogsNotesSingleType
};
type StateType = {};

class DesNotesPreviewMini extends PureComponent<PropType, StateType> {
  state = {};
  render(){
    let {desnote} = this.props;
    let formatDate = dateFormater(desnote.node.frontmatter.meta.date);

    return (
      <Link to={desnote.node.fields.slug} className={"desnotes-preview-mini is-color-" + desnote.node.frontmatter.meta.primary_color}
        style={{backgroundImage: `url(${desnote.node.frontmatter.image_main})`}}>
        <div className="desnotes-preview-mini__title-box">
          <h3>{desnote.node.frontmatter.title}</h3>
          <h6>{formatDate}</h6>
        </div>
      </Link>
    );
  }
}

export default DesNotesPreviewMini;

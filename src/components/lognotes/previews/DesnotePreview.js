// @flow

import React, { PureComponent } from "react";
import Link from 'gatsby-link';
import dateFormater from '../../shared/ults/dateFormater';
// import type {DesNotesType} from '../../../../types/siteTypes';

import type {QueryLogsNotesSingleType} from '../../../pages/index';

type PropType = {
  // desnote: DesNotesType
  desnote: QueryLogsNotesSingleType
};
type StateType = {};

class DesNotesPreview extends PureComponent<PropType, StateType> {
  state = {};
  render(){
    let {desnote} = this.props;

    if(!desnote);
    let formatDate = dateFormater(desnote.node.frontmatter.meta.date);

    return (
      <Link to={desnote.node.fields.slug} className={'desnotes-preview is-color-' + desnote.node.frontmatter.meta.primary_color}
        style={{backgroundImage: `url(${desnote.node.frontmatter.image_main})`}}>
        <div className="desnotes-preview__meta">
          {
            desnote.node.frontmatter.tags.map((tag) => (
              <span className="h6" key={tag}>#{tag}</span>
            ))
          }
        </div>
        <div className="desnotes-preview__title-box">
          <h3>{desnote.node.frontmatter.title}</h3>
          <h6>{formatDate}</h6>
          {/* <div className="desnotes-preview__read-progress">
            <h6>{desnote.meta.percent_read * 100}% Complete</h6>
          </div> */}
        </div>
      </Link>
    );
  }
}

export default DesNotesPreview;

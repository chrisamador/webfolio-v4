// @flow

import React, { PureComponent } from "react";
import Link from 'gatsby-link';
import dateFormater from '../../shared/ults/dateFormater';
// import type {DesNotesType} from '../../../../types/siteTypes';

import type {QueryLogsNotesSingleType} from '../../../pages/index';

type PropType = {
  // desnote: DesNotesType
  single: QueryLogsNotesSingleType
};
type StateType = {};

class DesNotesPreview extends PureComponent<PropType, StateType> {
  state = {};
  render(){
    let {single} = this.props;

    if(!single);
    let formatDate = dateFormater(single.node.frontmatter.date);

    return (
      <Link to={single.node.fields.slug} className={'desnotes-preview is-color-' + single.node.frontmatter.meta.primary_color}
        style={{backgroundImage: `url(${single.node.frontmatter.images.main_url})`}}>
        <div className="desnotes-preview__meta">
          {
            single.node.frontmatter.tags.map((tag) => (
              <span className="h6" key={tag}>#{tag}</span>
            ))
          }
        </div>
        <div className="desnotes-preview__title-box">
          <h3>{single.node.frontmatter.title}</h3>
          <h6>{formatDate}</h6>
          {/* <div className="desnotes-preview__read-progress">
            <h6>{single.meta.percent_read * 100}% Complete</h6>
          </div> */}
        </div>
      </Link>
    );
  }
}

export default DesNotesPreview;

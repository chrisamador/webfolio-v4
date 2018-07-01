// @flow

import React, { PureComponent } from "react";
import Link from 'gatsby-link';
import dateFormater from "../../shared/ults/dateFormater";
// import type {DesNotesType} from '../../../../types/siteTypes';

type PropType = {
  // desnote: DesNotesType
};
type StateType = {};

class DesNotesPreview extends PureComponent<PropType, StateType> {
  state = {};
  render(){
    let {desnote} = this.props;
    if(!desnote) desnote = {title: 'Test', tags: [], meta: {date: {}}, images: {type: 'react'}}
    let formatDate = dateFormater(desnote.meta.date);
    return (
      <Link to={`/logs-and-notes/${desnote.slug}`} className={"desnotes-preview is-color-" + desnote.meta.primary_color}
        style={{backgroundImage: `url(${desnote.images.main_url})`}}>
        <div className="desnotes-preview__meta">
          {
            desnote.tags.map((tag) => (
              <span className="h6" key={tag}>#{tag}</span>
            ))
          }
        </div>
        <div className="desnotes-preview__title-box">
          <h3>{desnote.title}</h3>
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

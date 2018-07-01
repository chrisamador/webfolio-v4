// @flow
import React, { PureComponent } from "react";
import Link from 'gatsby-link';
// import type {DesNotesType} from '../../../../types/siteTypes';
import dateFormater from "../../shared/ults/dateFormater";

type PropType = {
  desnote: DesNotesType
};
type StateType = {};

class DesNotesPreviewMini extends PureComponent<PropType, StateType> {
  state = {};
  render(){
    let {desnote} = this.props;
    let formatDate = dateFormater(desnote.meta.date);
    return (
      <Link to={`/logs-and-notes/${desnote.slug}`} className={"desnotes-preview-mini is-color-" + desnote.meta.primary_color}
        style={{backgroundImage: `url(${desnote.images.main_url})`}}>
        <div className="desnotes-preview-mini__title-box">
          <h3>{desnote.title}</h3>
          <h6>{formatDate}</h6>
        </div>
      </Link>
    );
  }
}

export default DesNotesPreviewMini;

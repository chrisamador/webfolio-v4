// @flow
import initState from '../initState';

const UPDATE_SITEMETA_COLOR = 'UPDATE_SITEMETA_COLOR';

// REDUCER
export default function siteMetaReducer(state = initState.siteMeta, action) {
  switch (action.type) {
    case UPDATE_SITEMETA_COLOR:
      return Object.assign({}, state, {navColor: action.color});
    // case LOAD_WORKS_DATA_SUCCESS:
    //   return Object.assign({}, action.data);
    default:
      return state;
  }
}

// ACTIONS
export class SiteMetaActions {
  static updateSiteMetaColor = (color: string) => ({
    type: UPDATE_SITEMETA_COLOR,
    color,
  });
  // static loadUserDataSuccess = userData => ({
  //   type: LOAD_WORKS_DATA_SUCCESS,
  //   data: userData,
  // });
}

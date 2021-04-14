/*
 *
 * AuthProvider reducer
 *
 */
import produce, { setAutoFreeze } from 'immer';

import {
  CHANGE_FIELD,
  GET_PROFILE_ERROR,
  GET_PROFILE_SUCCESS,
  HIDE_HEADER,
  IS_LOGGED_ERROR,
  IS_LOGGED_SUCCESS,
  LOAD_NOTIFICATIONS,
  LOGGED_IN,
  LOGOUT,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS,
  UPDATE_INVOLVED_COMPANIES,
} from 'containers/App/constants';
import { LOCATION_CHANGE } from 'connected-react-router';

export const initialState = {
  limit: 1,
  workInterval: 60 * 60 * 1000,
  // workInterval: localStorage.getItem('timer'),
  hourlyMemo: '',
  takeItEasy: '',
  selectedCompany: '',
  hideHeader: false,
  isLoading: false,
  unreadCount: 0,
  userMenu: false,
  userNotification: false,
  companies: [],
  notifications: [],
  isLogged: null,
  errors: {},
  user: {},
  error: '',
};

setAutoFreeze(false);
/* eslint-disable default-case, no-param-reassign */
const appPageReducer = produce((draft, action) => {
  switch (action.type) {
    case CHANGE_FIELD:
      draft[action.key] = action.val;
      draft.errors[action.key] = '';
      draft.isLoading = false;
      break;
    case LOGGED_IN:
    case IS_LOGGED_SUCCESS:
      draft.isLogged = true;
      break;
    case UPDATE_INVOLVED_COMPANIES:
      draft.companies = action.data;
      break;
    case LOAD_NOTIFICATIONS:
      draft.notifications = action.data;
      break;
    case HIDE_HEADER:
      draft.hideHeader = action.val;
      break;
    case IS_LOGGED_ERROR:
      draft.isLogged = false;
      break;
    case GET_PROFILE_SUCCESS:
      draft.user = action.user;
      break;
    case GET_PROFILE_ERROR:
      draft.error = action.error;
      break;
    case LOGOUT:
    case LOGOUT_SUCCESS:
    case LOGOUT_ERROR:
      draft.erros = {};
      draft.error = '';
      draft.user = {};
      draft.isLogged = false;
      break;
    case LOCATION_CHANGE:
      draft.isLoading = false;
      draft.takeItEasy = '';
      draft.limit = 1;
      draft.userMenu = false;
      draft.hideHeader = false;
      draft.userNotification = false;
      break;
    default:
  }
}, initialState);

export default appPageReducer;
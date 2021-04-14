/*
 *
 * VerifyAccountPage reducer
 *
 */
import produce from 'immer';
import { LOCATION_CHANGE } from 'connected-react-router';
import { SET_VERIFY_CODE } from 'containers/VerifyAccountPage/constants';

export const initialState = {
  verifyCode: '',
};

/* eslint-disable default-case, no-param-reassign */
const slackPageReducer = produce((draft, action) => {
  switch (action.type) {
    case SET_VERIFY_CODE:
      draft.verifyCode = action.code;
      break;
    case LOCATION_CHANGE:
      draft.verifyCode = '';
      break;
  }
}, initialState);

export default slackPageReducer;
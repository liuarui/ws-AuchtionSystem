import req from '@Network';
import types from '../Types';
import { createAction } from 'redux-actions';

export const initUserInfo = createAction(types.INIT_USER_INFO);
export const setModalVisibleStatus = createAction(
  types.SET_MODAL_VISIBLE_STATUS,
);
export const setModalParams = createAction(types.SET_MODAL_PARAMS);

export function fetchUserInfo() {
  return dispatch => {
    req.get('/user_login.json').then(res => {
<<<<<<< HEAD:RN/App/Store/Actions/app.js
      const data = res.data

      dispatch(initUserInfo(data.user))
    })
  }
=======
      const data = res.data;

      dispatch(initUserInfo(data.user));
    });
  };
>>>>>>> 465fd0d2e97a74c7c7e7d5c125a4109d94d6871e:App/Store/Actions/app.js
}

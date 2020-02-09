import { handleActions } from 'redux-actions';
import types from '../Types';

<<<<<<< HEAD:RN/App/Store/Reducers/app.js
export default handleActions({
  [types.INIT_USER_INFO] (state, action) {
    return {
      ...state,
      user: action.payload
    }
  },
  [types.SET_MODAL_VISIBLE_STATUS] (state, action) {
    const { name, status } = action.payload,
      { modalVisible } = state

    modalVisible[name] = status
    return {
      ...state,
      modalVisible: {
        ...modalVisible
      }
    }
=======
export default handleActions(
  {
    [types.INIT_USER_INFO](state, action) {
      return {
        ...state,
        user: action.payload,
      };
    },
    [types.SET_MODAL_VISIBLE_STATUS](state, action) {
      const { name, status } = action.payload,
        { modalVisible } = state;

      modalVisible[name] = status;
      return {
        ...state,
        modalVisible: {
          ...modalVisible,
        },
      };
    },
    [types.SET_MODAL_PARAMS](state, action) {
      return {
        ...state,
        modalParams: action.payload,
      };
    },
>>>>>>> 465fd0d2e97a74c7c7e7d5c125a4109d94d6871e:App/Store/Reducers/app.js
  },
  {
    user: {},
    modalVisible: {
      publisher: false,
      webview: false,
      comment: false,
    },
    modalParams: {},
  },
);

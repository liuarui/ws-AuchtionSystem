import { handleActions } from 'redux-actions'
import types from '../Types'

export default handleActions(
  {
    [types.INIT_USER_TOKEN](state, action) {
      return {
        ...state,
        token: action.payload,
      }
    },
  },
  {
    token: {},
  },
)

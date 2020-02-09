import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import rootReducer from './Reducers'

<<<<<<< HEAD:RN/App/Store/index.js
export default function configStore () {
  const store = createStore(rootReducer, applyMiddleware(promiseMiddleware, thunkMiddleware))

=======
export default function configStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(promiseMiddleware, thunkMiddleware),
  )
>>>>>>> 465fd0d2e97a74c7c7e7d5c125a4109d94d6871e:App/Store/index.js
  return store
}

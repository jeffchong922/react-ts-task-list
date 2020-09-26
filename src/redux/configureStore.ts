import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './reducers'


export default function configureStore (preloadedState?: any) {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools()
  )
  return store
}
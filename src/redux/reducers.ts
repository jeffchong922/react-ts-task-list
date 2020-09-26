import { combineReducers } from 'redux'

import listsReducer from './lists/reducers'

const rootReducer = combineReducers({
  lists: listsReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
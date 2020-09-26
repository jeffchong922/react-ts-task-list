import { getItem, setItem } from '../../_helpers/local-storage'

import {
  Lists,
  ListState,
  ListsAction,
  ADD_LIST,
  GET_LISTS,
  GET_LIST_BY_ID,
  SET_LIST_ID_TO_DELETE,
  SET_LIST_TO_EDIT,
  DELETE_LIST,
  SET_SELECTED_LIST,
  UPDATE_LIST, ADD_TASK, SET_TASK_TO_EDIT, UNSET_TASK_TO_EDIT, DELETE_TASK, SET_TASK_TO_DELETE, UNSET_TASK_TO_DELETE, UPDATE_TASK
} from './types'

const initialState: ListState = {
  lists: {},
  listIdToDelete: '',
  listById: null,
  listToEdit: null,
  taskToEdit: null,
  selectedList: null,
  taskToDelete: null,
}

const storageKey = 'task_list'
const getListsFromLS = (): Lists => {
  return getItem(storageKey) || {}
}
const saveListsToLS = (lists: Lists) => {
  setItem(storageKey, lists)
}

function listsReducer (state = initialState, action: ListsAction): ListState {
  const listsFromLS = getListsFromLS()

  switch (action.type) {
    case ADD_LIST: {
      const clonedListsFromLS = { ...listsFromLS }
      clonedListsFromLS[action.payload.id] = action.payload
      saveListsToLS(clonedListsFromLS)
      return {
        ...state,
        lists: clonedListsFromLS
      }
    }
    case GET_LISTS: {
      return {
        ...state,
        lists: listsFromLS
      }
    }
    case GET_LIST_BY_ID: {
      const list = listsFromLS[action.payload]
      return {
        ...state,
        listById: list
      }
    }
    case SET_LIST_ID_TO_DELETE: {
      return {
        ...state,
        listIdToDelete: action.payload
      }
    }
    case SET_LIST_TO_EDIT: {
      const listToEdit = listsFromLS[action.payload]
      return {
        ...state,
        listToEdit
      }
    }
    case DELETE_LIST: {
      const clonedListsFromLS = { ...listsFromLS }
      const listId = clonedListsFromLS[action.payload].id
      delete clonedListsFromLS[action.payload]
      saveListsToLS(clonedListsFromLS)
      return {
        ...state,
        lists: clonedListsFromLS,
        listIdToDelete: '',
        listById: null,
        selectedList: state.selectedList && listId === state.selectedList.id ? null : state.selectedList
      }
    }
    case UPDATE_LIST: {
      const clonedListsFromLS = { ...listsFromLS }
      clonedListsFromLS[action.payload.id].name = action.payload.name
      saveListsToLS(clonedListsFromLS)
      return {
        ...state,
        lists: clonedListsFromLS,
        listToEdit: null,
      }
    }
    case SET_SELECTED_LIST: {
      const selectedList = listsFromLS[action.payload]
      return {
        ...state,
        selectedList: selectedList
      }
    }
    case ADD_TASK: {
      const clonedListsFromLS = { ...listsFromLS }
      clonedListsFromLS[action.payload.list.id].tasks.push(action.payload.task)
      saveListsToLS(clonedListsFromLS)
      return {
        ...state,
        lists: clonedListsFromLS,
        selectedList: clonedListsFromLS[action.payload.list.id]
      }
    }
    case SET_TASK_TO_DELETE: {
      return {
        ...state,
        taskToDelete: {
          task: action.payload.task,
          list: action.payload.list
        }
      }
    }
    case UNSET_TASK_TO_DELETE: {
      return {
        ...state,
        taskToDelete: null
      }
    }
    case DELETE_TASK: {
      const clonedListsFromLS = { ...listsFromLS }
      const clonedTasks = [ ...clonedListsFromLS[state.taskToDelete!.list.id].tasks ]
      const task = clonedTasks.find(task => task.id === state.taskToDelete!.task.id)
      clonedTasks.splice(clonedTasks.indexOf(task!), 1)
      clonedListsFromLS[state.taskToDelete!.list.id].tasks = clonedTasks
      saveListsToLS(clonedListsFromLS)
      return {
        ...state,
        lists: clonedListsFromLS,
        selectedList: clonedListsFromLS[state.taskToDelete!.list.id],
        taskToDelete: null
      }
    }
    case SET_TASK_TO_EDIT: {
      return {
        ...state,
        taskToEdit: {
          task: action.payload.task,
          list: action.payload.list
        }
      }
    }
    case UNSET_TASK_TO_EDIT: {
      return {
        ...state,
        taskToEdit: null
      }
    }
    case UPDATE_TASK: {
      const clonedListsFromLS = { ...listsFromLS }
      const clonedList = { ...clonedListsFromLS[action.payload.list.id] }
      const clonedTasks = [ ...clonedList.tasks ]
      const task = clonedTasks.find(task => task.id === action.payload.taskId)
      const clonedTask = { ...task! }
      clonedTask.name = action.payload.taskName
      clonedTask.completed = action.payload.taskState
      const updatedTasks = clonedTasks.map(task => task.id === clonedTask.id ? clonedTask : task)
      clonedList.tasks = updatedTasks
      clonedListsFromLS[clonedList.id] = clonedList
      saveListsToLS(clonedListsFromLS)
      return {
        ...state,
        lists: clonedListsFromLS,
        selectedList: clonedList,
        taskToEdit: null
      }
    }
    default: return state
  }
}

export default listsReducer
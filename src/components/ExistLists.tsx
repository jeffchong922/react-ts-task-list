import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { FaTimesCircle } from 'react-icons/fa'

import { List } from '../redux/lists/types'
import { RootState } from '../redux/reducers'
import { setListIdToDelete, getLists, setListToEdit } from '../redux/lists/actions'

const mapState = (state: RootState) => ({
  lists: state.lists.lists
})
const mapDispatch = {
  getLists,
  setListToEdit,
  setListIdToDelete
}
const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

interface ExistListsProps extends PropsFromRedux {
  className?: string;
}

const cursorPointer = {
  cursor: 'pointer'
}

const ExistLists: React.FC<ExistListsProps> = (props) => {
  const { lists, className, getLists, setListIdToDelete, setListToEdit } = props

  useEffect(() => {
    getLists()
  }, [getLists])

  function handleSetDeleteId (id: string) {
    setListIdToDelete(id)
  }

  function handleSetEditId (id: string) {
    setListToEdit(id)
  }

  return (
    <div className={'panel ' + className}>
      <p className="panel-heading has-background-dark has-text-white">已有的任务列表</p>
      {
        Object.keys(lists).length === 0
          ? <p className='py-4 has-text-centered'>还没有创建任务列表</p>
          : Object.values(lists).map((list: List) => (
              <div className="panel-block py-4" key={list.id} style={{ justifyContent: "space-between" }}>
                <p onClick={() => handleSetEditId(list.id)}
                  style={cursorPointer}
                >{list.name}</p>
                <span className="icon has-text-danger"
                  style={cursorPointer}
                  onClick={() => handleSetDeleteId(list.id)}
                >
                  <FaTimesCircle/>
                </span>
              </div>
            ))
      }
    </div>
  )
}

export default connector(ExistLists)

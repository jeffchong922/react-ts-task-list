import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { deleteList, getListById, setListIdToDelete } from '../redux/lists/actions'
import { Task } from '../redux/lists/types'
import { RootState } from '../redux/reducers'
import Modal from './Modal'

const mapState = (state: RootState) => ({
  list: state.lists.listById,
  listId: state.lists.listIdToDelete,
})
const mapDispatch = {
  deleteList,
  getListById,
  setListIdToDelete
}
const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

type DeleteListModalProps = PropsFromRedux

const DeleteListModal: React.FC<DeleteListModalProps> = (props) => {
  const { list, listId, deleteList, getListById, setListIdToDelete } = props

  useEffect(() => {
    getListById(listId)
  }, [listId, getListById])

  function handleConfirm () {
    deleteList(listId)
  }

  function handleModalHide () {
    setListIdToDelete('')
  }

  return listId
    ? (
        <Modal modalTitle="确定删除任务列表吗 ?"
          handleConfirm={handleConfirm}
          handleModalHide={handleModalHide}
        >
          <div className="content my-3">
            <h3 className="is-size-5 has-text-centered has-text-danger">与之相关的任务都会删除</h3>
            {
              list?.tasks.length === 0
                ? <p className="has-text-centered">当前列表没有任务</p>
                : (
                    <ul>
                      {list?.tasks.map((task: Task) => (
                        <li key={task.id}>
                          <p>{task.name}&nbsp;
                          <span className={`tag is-rounded ${task.completed ? 'is-success' : 'is-warning'}`}>{task.completed ? '已完成' : '未完成' }</span>
                          </p>
                        </li>
                      ))}
                    </ul>
                  )
            }
          </div>
        </Modal>
      )
    : null
}

export default connector(DeleteListModal)

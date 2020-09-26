import React from 'react'
import { connect, ConnectedProps } from 'react-redux'

import Modal from './Modal'
import { RootState } from '../redux/reducers'
import { unsetTaskToDelete, deleteTask } from '../redux/lists/actions'

const mapState = (state: RootState) => ({
  task: state.lists.taskToDelete
})
const mapDispatch = {
  unsetTaskToDelete,
  deleteTask
}
const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

interface DeleteTaskModalProps extends PropsFromRedux {

}

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = (props) => {
  const { task, unsetTaskToDelete, deleteTask } = props

  function handleConfirm () {
    deleteTask(task!.task, task!.list)
  }

  function handleModalHide () {
    unsetTaskToDelete()
  }

  return task
    ? (
        <Modal modalTitle="确定要删除此任务吗 ?"
          handleConfirm={handleConfirm}
          handleModalHide={handleModalHide}
        >
        </Modal>
      )
    : null
}

export default connector(DeleteTaskModal)

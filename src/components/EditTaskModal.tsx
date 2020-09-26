import React, { FormEvent, useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import Modal from './Modal'
import { RootState } from '../redux/reducers'
import { unsetTaskToEdit, updateTask } from '../redux/lists/actions'

const mapState = (state: RootState) => ({
  task: state.lists.taskToEdit
})
const mapDispatch = {
  updateTask,
  unsetTaskToEdit,
}
const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

interface EditTaskModalProps extends PropsFromRedux {

}

const EditTaskModal: React.FC<EditTaskModalProps> = (props) => {
  const { task, updateTask, unsetTaskToEdit } = props

  const [modifiedTaskName, setModifiedTaskName] = useState('')
  const [taskState, setTaskState] = useState(false)

  useEffect(() => {
    setModifiedTaskName(task?.task.name || '')
    setTaskState(task?.task.completed || false)
  }, [task])

  function handleConfirm () {
    const prevName = task!.task.name
    const prevState = task!.task.completed

    if (!modifiedTaskName.trim()) {
      alert('任务名称不能为空!')
      return setModifiedTaskName(prevName)
    }

    if (modifiedTaskName.trim() === prevName && taskState === prevState) {
      return alert('任务的名称与状态与之前相同!')
    }

    updateTask(task!.task.id, modifiedTaskName, taskState, task!.list)
  }

  function handleModalHide () {
    unsetTaskToEdit()
  }

  function handleNameChange (e: FormEvent<HTMLInputElement>) {
    setModifiedTaskName(e.currentTarget.value)
  }

  function handleStateChange (e: FormEvent<HTMLInputElement>) {
    setTaskState(e.currentTarget.checked)
  }

  return task
    ? (
        <Modal modalTitle="修改任务"
          handleConfirm={handleConfirm}
          handleModalHide={handleModalHide}
        >
          <div className="content my-3">
            <div className="field">
              <label htmlFor="modifiedTaskName" className="label">任务名称</label>
              <div className="control">
                <input id="modifiedTaskName" type="text" className="input"
                  placeholder="Task Name"
                  value={modifiedTaskName}
                  onChange={handleNameChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">任务完成状态</label>
              <label htmlFor="taskState" className="label">
                <input type="checkbox" id="taskState"
                  checked={taskState}
                  onChange={handleStateChange}
                />&nbsp;完成
              </label>
            </div>
          </div>
        </Modal>
      )
    : null
}

export default connector(EditTaskModal)

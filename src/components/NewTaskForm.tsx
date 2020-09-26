import React, { FormEvent, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { RootState } from '../redux/reducers'
import { addTask } from '../redux/lists/actions'
import { Task } from '../redux/lists/types'

const mapState = (state: RootState) => ({
  list: state.lists.selectedList,
})
const mapDispatch = {
  addTask
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

interface NewTaskFormProps extends PropsFromRedux {
  className?: string;
}

const NewTaskForm: React.FC<NewTaskFormProps> = (props) => {
  const { list, addTask, className } = props
  const [name, setName] = useState('')

  function handleNameChange (e: FormEvent<HTMLInputElement>) {
    setName(e.currentTarget.value)
  }

  function handleSubmit (e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!name.trim()) {
      return alert('任务名称不能为空!!')
    }

    const newTask: Task = {
      id: `task-${Date.now()}`,
      name: name.trim(),
      completed: false
    }

    if (list) {
      addTask(newTask, list)
      setName('')
    } else {
      alert('未找到选择的列表!!')
    }

  }

  return list
    ? (
        <div className={className}>
          <h3 className='is-size-4 has-text-centered'>添加新的任务到选择的列表</h3>
          <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="taskName" className="label">任务名称</label>
                <div className="control">
                  <input id="taskName" type="text" className="input"
                    placeholder="Task Name"
                    value={name}
                    onChange={handleNameChange}
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button has-background-dark has-text-white">添加任务</button>
                </div>
              </div>
            </form>
        </div>
      )
    : null

}

export default connector(NewTaskForm)

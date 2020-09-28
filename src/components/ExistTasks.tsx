import React from 'react'
import { FaEdit, FaTimes } from 'react-icons/fa'
import { connect, ConnectedProps } from 'react-redux'

import { List, Task } from '../redux/lists/types'
import { RootState } from '../redux/reducers'
import { setTaskToDelete, setTaskToEdit } from '../redux/lists/actions'

const mapState = (state: RootState) => ({
  list: state.lists.selectedList
})
const mapDispatch = {
  setTaskToEdit,
  setTaskToDelete,
}
const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

interface ExistTasksProps extends PropsFromRedux {
  className?: string;
}

const ExistTasks: React.FC<ExistTasksProps> = ({ list, className, setTaskToEdit, setTaskToDelete }) => {

  function handleTaskEdit (task: Task, list: List) {
    setTaskToEdit(task, list)
  }

  function handleTaskDelete (task: Task, list: List) {
    setTaskToDelete(task, list)
  }

  const tasksTable = (list: List) => (
    <table className="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th>任务</th>
          <th className="has-text-centered">编辑</th>
          <th className="has-text-centered">删除</th>
        </tr>
      </thead>
      <tbody>
        {
          list.tasks.map((task: Task) => (
            <tr key={task.id}>
              <td><p><span className={`tag is-rounded ${task.completed ? 'is-success' : 'is-warning'}`}>{task.completed ? '已完成' : '未完成' }</span> {task.name}</p></td>
              <td className="has-text-centered">
                <button className="button is-info is-small"
                  onClick={() => handleTaskEdit(task, list)}
                >
                  <span className="icon">
                    <FaEdit/>
                  </span>
                </button>
              </td>
              <td className="has-text-centered">
                <button className="button is-danger is-small"
                  onClick={() => handleTaskDelete(task, list)}
                >
                  <span className="icon">
                    <FaTimes/>
                  </span>
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )

  return list
    ? (
        <div className={className}>
          <h3 className="is-size-4 has-text-centered">选定列表中的任务列表</h3>
          {
            list.tasks.length === 0
              ? <p className='py-4 has-text-centered'>还没有添加任务</p>
              : tasksTable(list)
          }
        </div>
      )
    : null
}

export default connector(ExistTasks)

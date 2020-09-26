import React, { FormEvent, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { List } from '../redux/lists/types'
import { addList } from '../redux/lists/actions'

const mapState = () => ({})
const mapDispatch = {
  addList
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

interface NewListCardProps extends PropsFromRedux {
  className?: string;
}

const NewListCard: React.FC<NewListCardProps> = ({ addList, className }) => {
  const [name, setName] = useState('')

  function handleNameChange (e: FormEvent<HTMLInputElement>) {
    setName(e.currentTarget.value)
  }

  function handleSubmit (e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!name.trim()) {
      return alert('任务列表名称不能为空!!')
    }

    const newList: List = {
      id: `list-${Date.now()}`,
      name: name.trim(),
      tasks: []
    }

    addList(newList)

    setName('')
  }

  return (
    <div className={
      'card ' + className
    }>
      <div className="card-header">
        <p className="card-header-title">创建任务列表</p>
      </div>
      <div className="card-content">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name" className="label">任务列表名称</label>
            <div className="control">
              <input id="name" type="text" className="input"
                placeholder="List Name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button type="submit" className="button has-background-dark has-text-white">创建</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default connector(NewListCard)
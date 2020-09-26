import React, { FormEvent } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { FaList } from 'react-icons/fa'

import { RootState } from '../redux/reducers'
import { setSelectedList } from '../redux/lists/actions'
import { List } from '../redux/lists/types'

const mapState = (state: RootState) => ({
  lists: state.lists.lists,
})
const mapDispatch = {
  setSelectedList
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

interface SelectListProps extends PropsFromRedux {
  className?: string;
}

const fullWidth = {
  width: '100%'
}

const SelectList: React.FC<SelectListProps> = (props) => {
  const { lists, setSelectedList, className } = props

  function handleSelected (e: FormEvent<HTMLSelectElement>) {
    setSelectedList(e.currentTarget.value)
  }

  return (
    <div className={className}>
      <h3 className="is-size-4 has-text-centered mb-5">选择一个任务列表</h3>
      <div className="field">
        <div className="control has-icons-left">
          <div className="select" style={fullWidth}>
            <select style={fullWidth}
              onChange={handleSelected}
            >
              <option value="">选择列表</option>
              {
                Object.values(lists).length > 0 &&
                Object.values(lists).map((list: List) => (
                  <option key={list.id} value={list.id}>{list.name}</option>
                ))
              }
            </select>
          </div>
          <span className="icon is-small is-left">
            <FaList/>
          </span>
        </div>
      </div>
    </div>
  )
}

export default connector(SelectList)

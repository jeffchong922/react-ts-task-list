import React, { FormEvent, useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { updateList, setListToEdit } from '../redux/lists/actions'
import { RootState } from '../redux/reducers'
import Modal from './Modal'

const mapState = (state: RootState) => ({
  list: state.lists.listToEdit
})
const mapDispatch = {
  updateList,
  setListToEdit
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

type DeleteListModalProps = PropsFromRedux

const EditListModal: React.FC<DeleteListModalProps> = (props) => {
  const { list, updateList, setListToEdit } = props

  const [modifiedName, setModifiedName] = useState('')

  useEffect(() => {
    setModifiedName(list?.name || '')
  }, [list])

  function handleConfirm () {
    const prevName = list!.name

    if (!modifiedName.trim()) {
      alert('任务列表名称不能为空!')
      return setModifiedName(prevName)
    }

    if (modifiedName.trim() === prevName) {
      return alert('修改后的名字与之前的相同!')
    }

    updateList(list!.id, modifiedName.trim())
  }

  function handleModalHide () {
    setListToEdit('')
  }

  function handleNameChange (e: FormEvent<HTMLInputElement>) {
    setModifiedName(e.currentTarget.value)
  }

  return list
    ? (
        <Modal modalTitle="修改任务列表"
          handleConfirm={handleConfirm}
          handleModalHide={handleModalHide}
        >
          <div className="content my-3">
            <div className="field">
              <label htmlFor="modifiedName" className="label">列表名称</label>
              <div className="control">
                <input id="modifiedName" type="text" className="input"
                  placeholder="List Name"
                  value={modifiedName}
                  onChange={handleNameChange}
                />
              </div>
            </div>
          </div>
        </Modal>
      )
    : null
}

export default connector(EditListModal)

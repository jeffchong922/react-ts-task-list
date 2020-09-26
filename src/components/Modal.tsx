import React, { useEffect } from 'react'

import { addClass, removeClass } from '../_helpers/dom-tools'

export interface ModalProps {
  modalTitle: string;
  children?: React.ReactNode;
  handleConfirm?: () => void;
  handleModalHide: () => void;
}

const Modal: React.FC<ModalProps> = (props) => {
  const { modalTitle, children, handleConfirm, handleModalHide } = props
  useEffect(() => {
    addClass(window.document.documentElement, 'is-clipped')
    return () => {
      removeClass(window.document.documentElement, 'is-clipped')
    }
  }, [])
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={handleModalHide}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            {modalTitle}
          </p>
        </header>
        <section className="modal-card-body py-0">
          {children}
        </section>
        <footer className="modal-card-foot">
          <button className="button is-danger" onClick={handleConfirm}>确定</button>
          <button className="button" onClick={handleModalHide}>取消</button>
        </footer>
      </div>
    </div>
  )
}

export default Modal

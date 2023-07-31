'use client'
import { FC, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'

import styles from './Modal.module.scss'

import { Modal } from './models'

import CloseImage from '@assets/Icons/close-black.svg'

const Modal: FC<Modal> = ({ children, onClose, modal }) => {
  const bodyElement = useMemo(() => window.document.querySelector('body'), []) as HTMLBodyElement
  const element = useMemo(() => window.document.createElement('div'), [])

  useEffect(() => {
    if (modal) {
      bodyElement.appendChild(element)
      bodyElement.classList.add('disabled')

      return () => {
        bodyElement.removeChild(element)
        bodyElement.classList.remove('disabled')
      }
    }
  }, [modal])

  if (modal) {
    return createPortal(
      <div onClick={onClose} className={styles.modal}>
        <div onClick={(e) => e.stopPropagation()} className={styles.modal__wrapper}>
          <header className={styles.modal__header}>
            <h4 className={styles.modal__headerTitle}>Item Configuration</h4>
            <CloseImage
              src={CloseImage}
              onClick={onClose}
              className={styles.modal__headerClose}
              alt='Close'
            />
          </header>
          <main className={styles.modal__content}>{children}</main>
        </div>
      </div>,
      bodyElement
    )
  }

  return null
}

export default Modal

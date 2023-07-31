'use client'
import { FC, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { createPortal } from 'react-dom'

import styles from './ClassicModal.module.scss'

import { ClassicModal } from './models'

import CloseImage from '@assets/Icons/close-black.svg'

const ClassicModal: FC<ClassicModal> = ({ children, onClose, modal, withCloseBtn }) => {
  const bodyElement = useMemo(
    () => (typeof document !== 'undefined' ? document.querySelector('body') : null),
    []
  ) as HTMLBodyElement | null
  const element = useMemo(
    () => (typeof document !== 'undefined' ? document.createElement('div') : null),
    []
  )

  useEffect(() => {
    if (modal && bodyElement && element) {
      bodyElement.appendChild(element)
      bodyElement.classList.add('disabled')

      return () => {
        bodyElement && bodyElement.removeChild(element)
        bodyElement.classList.remove('disabled')
      }
    }
  }, [modal, bodyElement, element])

  if (modal && bodyElement) {
    return createPortal(
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className={styles.modal}
      >
        <CloseImage
          onClick={onClose}
          className={withCloseBtn ? styles.modal__close : styles.modal__close_none}
        />
        <div onClick={(e) => e.stopPropagation()} className={styles.modal__body}>
          <main>{children}</main>
        </div>
      </motion.div>,
      bodyElement
    )
  }

  return null
}

export default ClassicModal

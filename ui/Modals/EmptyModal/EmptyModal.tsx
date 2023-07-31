'use client'

import { Dispatch, SetStateAction, useEffect, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { createPortal } from 'react-dom'

import styles from './EmptyModal.module.scss'

type Props = {
  isOpen?: boolean
  children: React.ReactNode
  onRequestClose: Dispatch<SetStateAction<boolean>>
}

const EmptyModal = ({ isOpen, children }: Props) => {
  const bodyElement = useMemo(() => document.querySelector('body'), [isOpen]) as HTMLBodyElement
  const portal = useRef(null)
  useEffect(() => {
    if (bodyElement && isOpen && portal.current) {
      bodyElement.appendChild(portal.current)
    }
    return () => {
      if (bodyElement && !isOpen && portal.current) {
        bodyElement.removeChild(portal.current)
      }
    }
  }, [isOpen])

  return isOpen
    ? createPortal(
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          ref={portal}
          className={styles.backDrop}
        >
          {children}
        </motion.div>,
        bodyElement
      )
    : null
}

export default EmptyModal

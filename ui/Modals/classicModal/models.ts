import { ReactNode } from 'react'

export type ClassicModal = {
  children: ReactNode
  onClose: () => void
  modal: boolean
  withCloseBtn: boolean
}

import { ReactNode } from 'react'

export type Modal = {
  children: ReactNode
  onClose: () => void
  modal: boolean
}

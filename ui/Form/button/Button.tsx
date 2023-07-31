import { FC, ReactNode } from 'react'

type BtnProps = {
  children: ReactNode
  styles: string
  disabled?: boolean
  onClick?: () => void
  className?: string
}

const Button: FC<BtnProps> = ({ children, styles, disabled, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${styles} py-[15px] flex items-center justify-center`}
    >
      {children}
    </button>
  )
}

export default Button

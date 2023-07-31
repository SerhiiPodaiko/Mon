import React, { FC, ReactNode } from 'react'

import styles from './InfoHashLink.module.scss'

type Props = {
  link: string
  children: ReactNode
  active?: boolean
}
const InfoHashLink: FC<Props> = ({ link, children, active = false }) => {
  return (
    <a href={link} className={`${styles.hashLink} ${active ? styles.hashLink__active : ''}`}>
      {children}
    </a>
  )
}

export default InfoHashLink

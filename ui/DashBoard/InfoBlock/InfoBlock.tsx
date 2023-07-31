import { FC, ReactNode } from 'react'

import styles from './InfoBlock.module.scss'

type Props = {
  name: string
  id: string
  children: ReactNode
}
const InfoBlock: FC<Props> = ({ name, id, children }) => {
  return (
    <div className={styles.infoBlock} style={{ gridArea: id }} id={id}>
      <span className={styles.infoBlock__title}>{name}</span>
      {children}
    </div>
  )
}

export default InfoBlock

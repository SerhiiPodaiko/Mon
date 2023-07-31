import { FC } from 'react'

import styles from './TopBlockWithSave.module.scss'

type Props = {
  name: string
  saveCallback: () => void
  loading?: boolean
  disabled: boolean
}

const TopBlockWithSave: FC<Props> = ({ name, saveCallback, loading, disabled = false }) => {
  return (
    <div className={styles.mainTopBlock}>
      <span className={styles.mainTopBlock__title}>{name}</span>
      <button
        className={styles.mainTopBlock__btn}
        onClick={() => saveCallback()}
        disabled={disabled}
      >
        {loading !== undefined ? (loading ? 'Saving...' : 'Save') : 'Save'}
      </button>
    </div>
  )
}

export default TopBlockWithSave

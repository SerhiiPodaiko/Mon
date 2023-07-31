import { useRouter } from 'next/navigation'

import styles from './Title.module.scss'

import ArrowLeft from '@assets/UserDashboard/toolbox/icons/arrowLeft.svg'

type Props = {
  disabled: boolean
  save: () => void
}

const Title = ({ disabled, save }: Props) => {
  const router = useRouter()
  const goBack = () => {
    router.push('/dashboard/user/toolbox')
  }
  return (
    <div className={styles.toolbox__pageTitleContainer}>
      <div className={styles.toolbox__leftBlock} onClick={goBack}>
        <ArrowLeft />
        <span className={styles.toolbox__pageTitle}>Back to Toolbox</span>
      </div>
      <div className={styles.toolbox__btnBlock}>
        <button className={styles.toolbox__pageBtn} onClick={() => save()} disabled={disabled}>
          Save and publish
        </button>
      </div>
    </div>
  )
}

export default Title

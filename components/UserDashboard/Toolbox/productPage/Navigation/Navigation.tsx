import { useRouter } from 'next/navigation'

import styles from './Navigation.module.scss'

import SmallArrowRight from '@assets/UserDashboard/toolbox/icons/smallArrowRight.svg'

type Props = {
  prevKey: string | undefined
  nextKey: string | undefined
}

const Navigation = ({ prevKey, nextKey }: Props) => {
  const router = useRouter()

  // Function to navigate to the next item
  const goToNextItem = () => {
    console.log('Going to the next item')
    router.push(`/dashboard/user/toolbox/${nextKey}`)
  }

  // Function to navigate to the previous item
  const goToPrevItem = () => {
    console.log('Going to the prev item')
    router.push(`/dashboard/user/toolbox/${prevKey}`)
  }

  return (
    <div className={styles.navigation}>
      <div onClick={() => goToNextItem()} className={styles.navigation__leftBlock}>
        <SmallArrowRight className={styles.navigation__smallArrowLeft} />
        <span className={styles.navigation__span}>Previous item</span>
      </div>
      <div onClick={() => goToPrevItem()} className={styles.navigation__rightBlock}>
        <span className={styles.navigation__span}>Next item</span>
        <SmallArrowRight className={styles.navigation__smallArrowRight} />
      </div>
    </div>
  )
}

export default Navigation

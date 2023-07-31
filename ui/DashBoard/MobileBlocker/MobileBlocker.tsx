import Link from 'next/link'

import styles from './MobileBlocker.module.scss'

import { PAGE_SLUGS } from '@constants/pages'

import Logo from '@assets/Images/logo.svg'
import IsolationMode from '@assets/IsolationMode.svg'

const MobileBlocker = () => {
  return (
    <div className={styles.bg}>
      <Link href={PAGE_SLUGS.home}>
        <Logo className={styles.logo} />
      </Link>
      <IsolationMode className={styles.isolation} />
      <span className={styles.desc}>Sorry, but mobile version is not accessible yet.</span>
      <span className={styles.subDesc}>Please, log in to the system with a desktop</span>
      <Link href={PAGE_SLUGS.marketplace} className={styles.btn}>
        Back to Marketplace
      </Link>
    </div>
  )
}

export default MobileBlocker

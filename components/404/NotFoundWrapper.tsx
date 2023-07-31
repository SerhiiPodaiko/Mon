'use client'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'

import styles from './NotFoundWrapper.module.scss'

import { PAGE_SLUGS } from '@constants/pages'

import RobotDesktopSVG from '@assets/Icons/404/404.svg'
import RobotTabletSVG from '@assets/Icons/robots/robot-404-tablet.svg'

const Error = () => {
  const isTablet = useMediaQuery({ maxWidth: 992 })

  return (
    <section className={styles.error}>
      <main className={styles.error__content}>
        <h2 className={styles.error__title}>
          <strong>Whoops. </strong>Looks like this page doesn't exist.
        </h2>
        <h1 className={styles.error__number}>404</h1>
        <Link href={PAGE_SLUGS.home} className={styles.error__link}>
          Back to home
        </Link>

        {isTablet ? (
          <RobotTabletSVG className={styles.error__robot} />
        ) : (
          <RobotDesktopSVG className={styles.error__robot} />
        )}
      </main>
    </section>
  )
}

export default Error

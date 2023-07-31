'use client'
import Link from 'next/link'
import { getCookie } from 'cookies-next'
import { useMediaQuery } from 'react-responsive'

import styles from './Cta.module.scss'

import { PAGE_SLUGS } from '@constants/pages'

import RobotSVG from '@assets/Icons/robots/robot-5.svg'
import RobotMobileSVG from '@assets/Icons/robots/robot-mobile-5.svg'

const Cta = () => {
  const isTablet = useMediaQuery({ maxWidth: 992 })
  const isLoginIn = getCookie('Role')

  return (
    <>
      {isLoginIn ? null : (
        <section className={styles.cta}>
          <div className={styles.cta__wrapper}>
            <h2 className={styles.cta__title}>
              <span> Become a part of</span>
              <br />
              <span>Monetiseur family</span>
            </h2>
            <p className={styles.cta__subtitle}>
              Monetiseur provides you with the sports categories you need to truly run professional
              campaigns
            </p>
            <div className={styles.cta__btnWrapper}>
              <Link href={PAGE_SLUGS.register} className={styles.cta__btn}>
                Join now
              </Link>
            </div>
          </div>
          <div className={styles.cta__robot}>{isTablet ? <RobotMobileSVG /> : <RobotSVG />}</div>
        </section>
      )}
    </>
  )
}

export default Cta

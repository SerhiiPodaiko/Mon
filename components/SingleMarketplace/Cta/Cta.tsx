'use client'
import Link from 'next/link'
import { getCookie } from 'cookies-next'
import { useMediaQuery } from 'react-responsive'

import styles from './Cta.module.scss'

import { PAGE_SLUGS } from '@constants/pages'

import useGetAllProducts from '@hooks/Marketplace/useGetAllProducts'

import RobotSVG from '@assets/Icons/robots/robot-6.svg'
import DiagramSVG from '@assets/Images/single-marketplace/cta/diagram.svg'
import DiagramCircleSVG from '@assets/Images/single-marketplace/cta/diagram-circle.svg'
import DiagramMobileSVG from '@assets/Images/single-marketplace/cta/diagram-mobile.svg'
const Cta = () => {
  const { isFederateUrlPath } = useGetAllProducts()
  const isTablet = useMediaQuery({ maxWidth: 992 })
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const isLoginIn = getCookie('Role')

  return (
    <>
      {isLoginIn || isFederateUrlPath ? null : (
        <section className={styles.cta}>
          <div className={styles.cta__inner}>
            <div className={styles.cta__head}>
              <h2 className={styles.cta__title}>
                {isMobile ? (
                  <>
                    <span className={styles.cta__textWhite}>CONTACT US</span>
                    <br /> <span>to unlock</span>
                    <br />
                    <span>great features</span>
                  </>
                ) : (
                  <>
                    <span className={styles.cta__textWhite}>Sign up for FREE</span> <br />{' '}
                    <span>
                      to unlock <br /> great features
                    </span>
                  </>
                )}
              </h2>
              {isMobile && <button className={styles.cta__headBtn}>Contact sales</button>}
            </div>
            <div className={styles.cta__content}>
              <div className={styles.cta__contentWrapper}>
                {isTablet ? (
                  <div className={styles.cta__center}>
                    <DiagramMobileSVG />
                  </div>
                ) : (
                  <>
                    <div className={styles.cta__left}>
                      <DiagramSVG />
                    </div>
                    <div className={styles.cta__right}>
                      <DiagramCircleSVG />
                    </div>
                  </>
                )}
              </div>
              <Link href={PAGE_SLUGS.register} className={styles.cta__btn}>
                Join now
              </Link>
              <div className={styles.cta__robotWrapper}>
                <RobotSVG className={styles.cta__robot} />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default Cta

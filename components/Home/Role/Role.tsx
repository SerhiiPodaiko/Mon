'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'

import styles from './Role.module.scss'

import { PAGE_SLUGS } from '@constants/pages'

import RobotBrandSVG from '@assets/Icons/robots/robot-1.svg'
import RightHoldersSVG from '@assets/Icons/robots/robot-2.svg'
import LogoSVG from '@assets/Images/logo.svg'
import LogoMobileSVG from '@assets/Images/logo-mobile.svg'

const roleAnimation = {
  hidden: {
    y: 200,
    opacity: 0
  },
  visible: (custom: any) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.7 }
  })
}

const Role = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 })

  return (
    <motion.section
      initial='hidden'
      whileInView='visible'
      viewport={{ amount: 0.1, once: true }}
      className={styles.role}
    >
      <div className={styles.role__head}>
        <motion.h2 variants={roleAnimation} custom={0.8} className={styles.role__headTitle}>
          UNLOCK
        </motion.h2>
        <motion.div variants={roleAnimation} custom={1} className={styles.role__headWrapper}>
          <p className={styles.role__headWrapperSubtitle}>The full power of</p>
          {isMobile ? <LogoMobileSVG /> : <LogoSVG className={styles.role__headWrapperLogo} />}
        </motion.div>
      </div>
      <div className={styles.role__content}>
        <motion.div variants={roleAnimation} custom={2} className={styles.role__brand}>
          <h3 className={styles.role__brandTitle}>Brands</h3>
          <p className={styles.role__brandSubtitle}>
            Find out how we can help you make quicker, more targeted marketing campaigns.
          </p>
          <div className={styles.role__brandRobot}>
            <RobotBrandSVG className={styles.role__brandRobotImg} />
          </div>
          <div className={styles.role__brandLinksWrapper}>
            <Link href={PAGE_SLUGS.marketplace} className={styles.role__brandLink}>
              Go to marketplace
            </Link>
          </div>
        </motion.div>
        <motion.div variants={roleAnimation} custom={2.5} className={styles.role__rightHolders}>
          <h3 className={styles.role__rightHoldersTitle}>Right holders</h3>
          <p className={styles.role__rightHoldersSubtitle}>
            Find out how we can help you unlock more value from your media inventory.
          </p>
          <div className={styles.role__rightHoldersRobot}>
            <RightHoldersSVG />
          </div>
          <div className={styles.role__rightHoldersLinksWrapper}>
            <Link href={PAGE_SLUGS.register} className={styles.role__rightHoldersLink}>
              Get started
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Role

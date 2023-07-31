'use client'
import 'swiper/css/pagination'
import { motion } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import styles from './Platform.module.scss'

import RobotSVG from '@assets/Icons/robots/robot-3.svg'
import RobotMobileSVG from '@assets/Icons/robots/robot-mobile-3.svg'
import RobotTabletSVG from '@assets/Icons/robots/robot-tablet-3.svg'
import NumberOneSVG from '@assets/Images/home/platform/number-1.svg'
import NumberTwoSVG from '@assets/Images/home/platform/number-2.svg'
import NumberThreeSVG from '@assets/Images/home/platform/number-3.svg'
import LogoSVG from '@assets/Images/logo.svg'
import LogoMobileSVG from '@assets/Images/logo-mobile.svg'

const platformAnimation = {
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

const platformAnimationSteps = {
  hidden: {
    x: 200,
    opacity: 0
  },
  visible: (custom: any) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.7 }
  })
}

const Platform = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const isTablet = useMediaQuery({ maxWidth: 992 })

  return (
    <motion.section
      initial='hidden'
      whileInView='visible'
      viewport={{ amount: 0.1, once: true }}
      className={styles.platform}
    >
      <div className={styles.platform__head}>
        <motion.h2 variants={platformAnimation} custom={0.5} className={styles.platform__headTitle}>
          TODAY
        </motion.h2>
        <motion.div
          variants={platformAnimation}
          custom={1}
          className={styles.platform__headWrapper}
        >
          <p className={styles.platform__headWrapperSubtitle}>Start working with</p>
          {isMobile ? <LogoMobileSVG /> : <LogoSVG />}
        </motion.div>
        <div className={styles.platform__headInfo}>
          <motion.span
            variants={platformAnimation}
            custom={1.5}
            className={styles.platform__headInfoSubtitle}
          >
            Finding the right marketing partner and negotiating the details can take weeks.
          </motion.span>
          <motion.h4
            variants={platformAnimation}
            custom={2}
            className={styles.platform__headInfoTitle}
          >
            With Monetiseur you can {isMobile && <br />} get it done in a few minutes.
          </motion.h4>
        </div>
        <motion.div
          variants={platformAnimation}
          custom={2.5}
          className={styles.platform__headRobot}
        >
          {isTablet ? <RobotTabletSVG /> : isMobile ? <RobotMobileSVG /> : <RobotSVG />}
        </motion.div>
      </div>
      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ amount: 0.4, once: true }}
        className={styles.platform__content}
      >
        <Swiper
          modules={[Pagination]}
          slidesPerView={isMobile ? 1 : isTablet ? 2 : 3}
          loop={false}
          direction='horizontal'
          pagination={{ clickable: true }}
          className={styles.platform__steps}
        >
          <SwiperSlide>
            <motion.div
              variants={platformAnimationSteps}
              custom={1}
              className={styles.platform__stepsWrapper}
            >
              <NumberOneSVG />
              <div className={styles.platform__stepsWrapperInfo}>
                <h4 className={styles.platform__stepsWrapperInfoTitle}>
                  Register on
                  <br />
                  Monetiseur
                </h4>
                <span className={styles.platform__stepsWrapperInfoSubtitle}>
                  Fill out your profile to get started.
                </span>
              </div>
            </motion.div>
          </SwiperSlide>
          <SwiperSlide>
            <motion.div
              variants={platformAnimationSteps}
              custom={1.5}
              className={styles.platform__stepsWrapper}
            >
              <NumberTwoSVG />
              <div className={styles.platform__stepsWrapperInfo}>
                <h4 className={styles.platform__stepsWrapperInfoTitle}>
                  Manage <br /> your inventory
                </h4>
                <span className={styles.platform__stepsWrapperInfoSubtitle}>
                  Toolbox helps you to professionally manage your marketing inventory to attract
                  more brands.
                </span>
              </div>
            </motion.div>
          </SwiperSlide>
          <SwiperSlide>
            <motion.div
              variants={platformAnimationSteps}
              custom={2}
              className={styles.platform__stepsWrapper}
            >
              <NumberThreeSVG />
              <div className={styles.platform__stepsWrapperInfo}>
                <h4 className={styles.platform__stepsWrapperInfoTitle}>
                  Find <br /> partners
                </h4>
                <span className={styles.platform__stepsWrapperInfoSubtitle}>
                  Publish your proposal on the Marketplace and quickly reach the right partners.
                </span>
              </div>
            </motion.div>
          </SwiperSlide>
        </Swiper>
      </motion.div>
    </motion.section>
  )
}

export default Platform

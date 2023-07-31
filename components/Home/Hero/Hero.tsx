'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import AnchorLink from 'react-anchor-link-smooth-scroll'

import styles from './Hero.module.scss'

import { PAGE_SLUGS } from '@constants/pages'

import ArrowDownSVG from '@assets/Images/home/hero/arrow-down.svg'
import FigureSVG from '@assets/Images/home/hero/figure.svg'

const heroAnimation = {
  initial: {
    y: 100,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1
  }
}

const Hero = () => {
  return (
    <motion.section
      initial='initial'
      animate='visible'
      transition={{ delay: 0.5, type: 'spring' }}
      variants={heroAnimation}
      className={styles.hero}
    >
      <motion.div variants={heroAnimation} custom={0.5} className={styles.hero__videoWrapper}>
        <video autoPlay muted loop>
          <source src='/test/hero.webm' type={'video/webm'} />
        </video>
      </motion.div>
      <motion.div variants={heroAnimation} custom={1} className={styles.hero__wrapper}>
        <h1 className={styles.hero__title}>
          <span>Sports marketing</span>
          <span>Digitalised</span>
        </h1>
        <p className={styles.hero__subtitle}>
          We connect brands with athletes to create marketing campaigns effortlessly
        </p>
        <Link href={PAGE_SLUGS.register} className={styles.hero__link}>
          Get Started
        </Link>
      </motion.div>
      <div className={styles.hero__figure}>
        <div className={styles.hero__figureWrapper}>
          <AnchorLink href='#homeSportsFamily' className={styles.hero__downBtn}>
            <ArrowDownSVG alt='Down' />
          </AnchorLink>
          <FigureSVG className={styles.hero__figure__img} />
        </div>
      </div>
    </motion.section>
  )
}

export default Hero

'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'

import styles from './Faq.module.scss'

import Accordion from './components/Accordion'
import { mockData } from './data'

import LogoSVG from '@assets/Images/logo.svg'
import LogoMobileSVG from '@assets/Images/logo-mobile.svg'

const faqAnimation = {
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

const faqAnimationSteps = {
  hidden: {
    x: -200,
    opacity: 0
  },
  visible: (custom: any) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.3 }
  })
}

const Faq = () => {
  const [role, setRole] = useState<string>('brands')
  const [roleList, setRoleList] = useState<any>([])
  const [open, setOpen] = useState<unknown>(2)
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const isTablet = useMediaQuery({ maxWidth: 992 })
  const toggle = (index: number) => {
    if (open === index) {
      return setOpen(null)
    }

    setOpen(index)
  }

  useEffect(() => {
    if (role === 'brands') {
      setRoleList(mockData.brand)
    } else {
      setRoleList(mockData.rightHolder)
    }
  }, [role])

  return (
    <motion.section
      initial='hidden'
      whileInView='visible'
      viewport={{ amount: 0.1, once: true }}
      className={styles.faq}
    >
      <div className={styles.faq__head}>
        <motion.h2 variants={faqAnimation} custom={1} className={styles.faq__headTitle}>
          Learn more
        </motion.h2>
        <motion.div variants={faqAnimation} custom={1.5} className={styles.faq__headWrapper}>
          <p className={styles.faq__headWrapperSubtitle}>
            {isTablet ? 'FAQ' : 'Frequently asking questions'}
          </p>
          {isMobile ? (
            <LogoMobileSVG className={styles.faq__headWrapperLogo} />
          ) : (
            <LogoSVG className={styles.faq__headWrapperLogo} />
          )}
        </motion.div>
      </div>
      <motion.div variants={faqAnimation} custom={2} className={styles.faq__btnsWrapper}>
        <button
          type='button'
          className={`${styles.faq__btnsWrapperBtn} ${
            role === 'rightsHolder' ? styles.faq__btnsWrapperBtnActive : ''
          }`}
          onClick={() => setRole('rightsHolder')}
        >
          For right holders
        </button>
        <button
          type='button'
          className={`${styles.faq__btnsWrapperBtn} ${
            role === 'brands' ? styles.faq__btnsWrapperBtnActive : ''
          }`}
          onClick={() => setRole('brands')}
        >
          For brands
        </button>
      </motion.div>
      <motion.div variants={faqAnimation} custom={2.5} className={styles.faq__accordion}>
        {roleList?.map((item: any, index: number) => (
          <motion.div layout key={item.title} variants={faqAnimationSteps} custom={index}>
            <Accordion
              index={index}
              open={index === open}
              toggle={() => toggle(index)}
              title={item.title}
              type={item.type}
              descriptionArray={item.descArray}
              description={item.desc}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}

export default Faq

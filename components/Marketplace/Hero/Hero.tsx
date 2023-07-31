'use client'
import React from 'react'
import Image from 'next/image'
import AnchorLink from 'react-anchor-link-smooth-scroll'

import styles from './Hero.module.scss'

import HeroSearch from './components/HeroSearch'

import ArrowDownImage from '@assets/Icons/arrows/white.svg'
import HeroImage from '@assets/Images/marketplace/hero-marketplace.png'

const Hero = () => {
  return (
    <section className={styles.hero}>
      <Image src={HeroImage} className={styles.hero__img} alt='Hero' />
      <div className={styles.hero__wrapper}>
        <h1 className={styles.hero__title}>
          <span>Sports marketing</span>
          <span>Digitalised</span>
        </h1>
        <p className={styles.hero__subtitle}>
          We connect brands with athletes to create marketing campaigns effortlessly
        </p>
        <AnchorLink href='#sports-family' className={styles.hero__link}>
          <span>Search Rights Holders</span>
          <ArrowDownImage />
        </AnchorLink>
      </div>
      <HeroSearch />
    </section>
  )
}

export default Hero

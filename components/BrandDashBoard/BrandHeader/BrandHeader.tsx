'use client'
import Link from 'next/link'
import { useQuery } from 'react-query'

import styles from './BrandHeader.module.scss'

import { PAGE_SLUGS } from '@constants/pages'

import { BrandProfile } from '@lib/api/Dashboard/brand/models'
import { getBrandUser } from '@lib/api/Dashboard/brand/user/profile/getBrandUser'

import NotifySVG from '@assets/UserDashboard/notifyLogo.svg'
import noAvatar from '@assets/UserDashboard/profile/images/avatar_no.png'

const Header = () => {
  // Query the brand user profile data
  const { data } = useQuery<BrandProfile>('brandProfile', () => getBrandUser(), {
    staleTime: Infinity
  })

  return (
    <header className={styles.header}>
      <div className={styles.header__links}>
        {/* Link to the marketplace page */}
        <Link href={PAGE_SLUGS.marketplace}>Marketplace</Link>
        {/* Link to the user policy page */}
        <Link href={PAGE_SLUGS.home}>Terms of Services</Link>
      </div>
      <div className={styles.header__profileContainer}>
        {/* NotifySVG logo */}
        <NotifySVG className={styles.header__profileNutImg} />
        {/* Divider */}
        <div className={styles.header__divider}></div>
        <div className={styles.header__profile}>
          <div className={styles.header__imgBlock}>
            <img
              loading='lazy'
              className={styles.header__img}
              src={data && data.link ? data.link : noAvatar.src}
              alt='avatar'
            />
          </div>
          <div className={styles.header__info}>
            {/* Display the brand user's name */}
            <span className={styles.header__spanTitle}>
              {data ? data.first_name : ''} {data ? data.last_name : ''}
            </span>
            {/* Display the brand user's role */}
            <span className={styles.header__spanSubtitle}>{data ? data.role : ''}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

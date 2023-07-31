'use client'
import Link from 'next/link'
import { useQuery } from 'react-query'

import styles from './Header.module.scss'

import { PAGE_SLUGS } from '@constants/pages'

import { getUserMe } from '@lib/api/Dashboard/RightsHolder/user/profile/getUserMe'
import { Sportsman } from '@lib/api/Dashboard/RightsHolder/user/profile/models'

import NotifySVG from '@assets/UserDashboard/notifyLogo.svg'
import noAvatar from '@assets/UserDashboard/profile/images/avatar_no.png'

const Header = () => {
  // Fetch user profile data
  const { data, isLoading } = useQuery<Sportsman>('profile', () => getUserMe(), {
    staleTime: Infinity
  })

  return (
    <header className={styles.header}>
      {/* Links */}
      <div className={styles.header__links}>
        <Link href={PAGE_SLUGS.marketplace}>Marketplace</Link>
        <Link href={PAGE_SLUGS.home}>Terms of Services</Link>
      </div>

      {/* User Profile */}
      <div className={styles.header__profileContainer}>
        {/* Notification Icon */}
        <NotifySVG className={styles.header__profileNutImg} />

        {/* Divider */}
        <div className={styles.header__divider}></div>

        {/* User Info */}
        <div className={styles.header__profile}>
          <div className={styles.header__imgBlock}>
            {/* User Avatar */}
            <img
              loading='lazy'
              className={styles.header__img}
              //@ts-ignore
              src={data && data.link !== null && !isLoading ? data.link : noAvatar.src}
              alt='avatar'
            />
          </div>

          {/* UserName and Sport */}
          <div className={styles.header__info}>
            <span className={styles.header__spanTitle}>
              {/* Display user first and last name */}
              {data ? data.first_name : ''} {data ? data.last_name : ''}
            </span>
            <span className={styles.header__spanSubtitle}>
              {/* Display user kind of sport */}
              {data ? data.kind_of_sport.name : ''}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

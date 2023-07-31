'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, useSpring, Variants } from 'framer-motion'
import { useQuery } from 'react-query'

import styles from './BrandSideBar.module.scss'

import { PAGE_SLUGS } from '@constants/pages'

import { BrandProfile } from '@lib/api/Dashboard/brand/models'
import { getBrandUser } from '@lib/api/Dashboard/brand/user/profile/getBrandUser'

import useLogOut from '@hooks/useLogOut'

import LogoSVG from '@assets/UserDashboard/logo.svg'
import LogoutIcon from '@assets/UserDashboard/logoutIcon.svg'
import partnerIcon from '@assets/UserDashboard/partnerIcon.png'
import noAvatar from '@assets/UserDashboard/profile/images/avatar_no.png'
import SkipIcon from '@assets/UserDashboard/skipIcon.svg'

type Props = { name: string; link: string; icon: any; sysName: string }[]

// BrandSideBar component
const BrandSideBar = ({ items }: { items: Props }) => {
  // Fetch brand profile data using react-query
  const { data } = useQuery<BrandProfile>('brandProfile', () => getBrandUser(), {
    staleTime: Infinity
  })

  const pathname = usePathname()
  const { logOut } = useLogOut(pathname)
  const router = useRouter()

  const pathnameArr = pathname && pathname.split('/')
  const activeTab = pathnameArr && pathnameArr[pathnameArr.length - 1]
  const [active, setActive] = useState(true)

  const sidebarSpring = useSpring(0, { stiffness: 200, damping: 10 })
  const variants: Variants = {
    active: {
      width: 266
    },
    nonActive: {
      width: 96
    }
  }

  return (
    <motion.aside
      initial={false}
      animate={active ? 'active' : 'nonActive'}
      variants={variants}
      className={active ? styles.sideBar : styles.sideBarMinified}
      style={{ width: sidebarSpring }}
    >
      {active ? (
        <>
          <Link href={PAGE_SLUGS.home}>
            <LogoSVG />
          </Link>
          <div className={styles.navContainer}>
            <div className={styles.navButtons}>
              {items.map((btn) => (
                <div
                  key={btn.sysName}
                  className={`${styles.btn} ${
                    activeTab === btn.sysName ? `${styles.active} sideBar_active` : 'sideBar_common'
                  }`}
                  onClick={() => router.push(btn.link)}
                >
                  {btn.icon}
                  <span>{btn.name}</span>
                </div>
              ))}
            </div>
            <div className={styles.bottomButtons}>
              <div className={`${styles.btn} sideBar_common`} onClick={() => setActive(!active)}>
                <SkipIcon className='dashboard_icon' />
                <span>Hide menu</span>
              </div>
              <div className={styles.divider}></div>
              <Link href={PAGE_SLUGS.home} className={styles.styledBtn}>
                <Image src={partnerIcon} alt='partnerIcon' />
                <span>Become a partner</span>
              </Link>
              <div className={`${styles.btn} sideBar_common`} onClick={logOut}>
                <LogoutIcon className='dashboard__iconLogout' />
                <span>Logout</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.avatarBlock}>
            <img
              loading='lazy'
              className={styles.avatarImg}
              src={data && data.link ? data.link : noAvatar.src}
              alt='avatar'
            />
          </div>
          <div className={styles.navContainer}>
            <div className={styles.navButtons}>
              {items.map((btn) => (
                <div
                  key={btn.sysName}
                  className={`${styles.btn} ${
                    activeTab === btn.sysName ? `${styles.active} sideBar_active` : 'sideBar_common'
                  }`}
                  onClick={() => router.push(btn.link)}
                >
                  {btn.icon}
                </div>
              ))}
            </div>
            <div className={styles.bottomButtons}>
              <div className={`${styles.btn} sideBar_common`} onClick={() => setActive(!active)}>
                <SkipIcon className={`${styles.skip} dashboard_icon`} />
              </div>
              <div className={styles.divider}></div>
              <div className={styles.styledBtn}>
                <Image src={partnerIcon} alt='partnerIcon' />
              </div>
              <div className={`${styles.btn} sideBar_common`} onClick={logOut}>
                <LogoutIcon className='dashboard__iconLogout' />
              </div>
            </div>
          </div>
        </>
      )}
    </motion.aside>
  )
}

export default BrandSideBar

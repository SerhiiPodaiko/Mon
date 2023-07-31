'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, useSpring, Variants } from 'framer-motion'
import { useQuery } from 'react-query'

import styles from './SideBar.module.scss'

import { PAGE_SLUGS } from '@constants/pages'

import { getUserMe } from '@lib/api/Dashboard/RightsHolder/user/profile/getUserMe'
import { Sportsman } from '@lib/api/Dashboard/RightsHolder/user/profile/models'

import useLogOut from '@hooks/useLogOut'

import Preloader from '@ui/Preloader/Preloader'

import LogoSVG from '@assets/UserDashboard/logo.svg'
import LogoutIcon from '@assets/UserDashboard/logoutIcon.svg'
import partnerIcon from '@assets/UserDashboard/partnerIcon.png'
import noAvatar from '@assets/UserDashboard/profile/images/avatar_no.png'
import SkipIcon from '@assets/UserDashboard/skipIcon.svg'

// Define the type for the sidebar items
type Props = { name: string; link: string; icon: any; sysName: string }[]

const SideBar = ({ items }: { items: Props }) => {
  // Fetch user data using react-query
  const { data, isLoading } = useQuery<Sportsman>('profile', () => getUserMe(), {
    staleTime: Infinity
  })

  // Initialize necessary hooks and variables
  const router = useRouter()
  const pathname = usePathname()
  const { logOut } = useLogOut(pathname)
  const pathnameArr = pathname && pathname.split('/')
  const activeTab = pathnameArr && pathnameArr[pathnameArr.length - 1]

  const [active, setActive] = useState(true)

  // Define animation variants for the sidebar width
  const sidebarSpring = useSpring(0, { stiffness: 200, damping: 10 })
  const variants: Variants = {
    active: {
      width: 266
    },
    nonActive: {
      width: 96
    }
  }

  // Function to handle toggling the sidebar visibility
  const handleSetActive = () => {
    setActive(!active)
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
          {/* Render the logo with a link to the home page */}
          <Link download={<Preloader />} href={PAGE_SLUGS.home}>
            <LogoSVG />
          </Link>
          <div className={styles.navContainer}>
            <div className={styles.navButtons}>
              {/* Map through the sidebar items and render them */}
              {items.map((btn) => (
                <div
                  key={btn.sysName}
                  className={`${styles.btn} ${
                    activeTab === btn.sysName || pathnameArr?.includes(btn.sysName)
                      ? `${styles.active} sideBar_active`
                      : 'sideBar_common'
                  }`}
                  onClick={() => router.push(btn.link)}
                >
                  {btn.icon}
                  <span>{btn.name}</span>
                </div>
              ))}
            </div>
            <div className={styles.bottomButtons}>
              {/* Render the hide menu button */}
              <div className={`${styles.btn} sideBar_common`} onClick={handleSetActive}>
                <SkipIcon className='dashboard_icon' />
                <span>Hide menu</span>
              </div>
              <div className={styles.divider}></div>
              {/* Render the become a partner button */}
              <Link href={PAGE_SLUGS.home} className={styles.styledBtn}>
                <Image src={partnerIcon} alt='partnerIcon' />
                <span>Become a partner</span>
              </Link>
              {/* Render the logout button */}
              <div className={`${styles.btn} sideBar_common`} onClick={logOut}>
                <LogoutIcon className='dashboard__iconLogout' />
                <span>Logout</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Render the user avatar */}
          <div className={styles.avatarBlock}>
            <img
              loading='lazy'
              className={styles.avatarImg}
              //@ts-ignore
              src={!isLoading && data && data.link !== null ? data.link : noAvatar.src}
              alt='avatar'
            />
          </div>

          <div className={styles.navContainer}>
            <div className={styles.navButtons}>
              {/* Map through the sidebar items and render them */}
              {items.map((btn) => (
                <div
                  key={btn.sysName}
                  className={`${styles.btn} ${
                    activeTab === btn.sysName || pathnameArr?.includes(btn.sysName)
                      ? `${styles.active} sideBar_active`
                      : 'sideBar_common'
                  }`}
                  onClick={() => router.push(btn.link)}
                >
                  {btn.icon}
                </div>
              ))}
            </div>
            <div className={styles.bottomButtons}>
              {/* Render the show menu button */}
              <div className={`${styles.btn} sideBar_common`} onClick={handleSetActive}>
                <SkipIcon className={`${styles.skip} dashboard_icon`} />
              </div>
              <div className={styles.divider}></div>
              {/* Render the partner icon */}
              <div className={styles.styledBtn}>
                <Image src={partnerIcon} alt='partnerIcon' />
              </div>
              {/* Render the logout button */}
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

export default SideBar

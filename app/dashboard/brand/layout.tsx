'use client'
import { useMediaQuery } from 'react-responsive'

import '../globals.css'
import styles from './Layout.module.scss'

import { BrandHeader, BrandSideBar } from '@components/BrandDashBoard'

import MobileBlocker from '@ui/DashBoard/MobileBlocker/MobileBlocker'

import Icons from '@assets/UserDashboard'
import DealsIcon from '@assets/UserDashboard/dealsIcon.svg'
import ProfileIcon from '@assets/UserDashboard/profileIcon.svg'
// import { useQuery } from 'react-query'
// import { BrandProfile } from '@lib/api/Dashboard/brand/models'
// import { getBrandUser } from '@lib/api/Dashboard/brand/user/profile/getBrandUser'
// import { redirect } from 'next/navigation'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  // const { isLoading, data } = useQuery<BrandProfile>('brandProfile', () => getBrandUser(), {
  //   staleTime: Infinity
  // })
  // console.log(isLoading)
  // console.log(data)
  //
  // if (!isLoading && !data) {
  //   redirect('/login')
  // }

  const navItems = [
    {
      name: 'Profile',
      link: '/dashboard/brand/profile',
      icon: <ProfileIcon className='dashboard_icon' />,
      sysName: 'profile'
    },
    {
      name: 'Deals',
      link: '/dashboard/brand/deals',
      icon: <DealsIcon className='dashboard_icon' />,
      sysName: 'deals'
    },
    {
      name: 'Settings',
      link: '/dashboard/brand/settings',
      icon: <Icons.SettingIcon className='dashboard_icon' />,
      sysName: 'settings'
    }
    // {
    //   name: 'Support',
    //   link: '/dashboard/brand/support',
    //   icon: <SupportIcon className='dashboard_icon' />,
    //   sysName: 'support'
    // }
  ]
  if (isMobile) {
    return <MobileBlocker />
  }
  return (
    <div className={styles.wrapper}>
      <BrandSideBar items={navItems} />
      <main className='dashboard'>
        <BrandHeader />
        {children}
      </main>
    </div>
  )
}

export default Layout

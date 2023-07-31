'use client'

import { useQuery } from 'react-query'
import { useMediaQuery } from 'react-responsive'

import '../globals.css'
import styles from './Layout.module.scss'

import { Header, SideBar } from '@components/UserDashboard'

import { getUserMe } from '@lib/api/Dashboard/RightsHolder/user/profile/getUserMe'

import MobileBlocker from '@ui/DashBoard/MobileBlocker/MobileBlocker'

import Icons from '@assets/UserDashboard'

type TNavItems = {
  name: string
  link: string
  icon: JSX.Element
  sysName: string
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const navItems: TNavItems[] = [
    {
      name: 'Profile',
      link: '/dashboard/user/profile',
      icon: <Icons.ProfileIcon className='dashboard_icon' />,
      sysName: 'profile'
    },
    {
      name: 'Toolbox',
      link: '/dashboard/user/toolbox',
      icon: <Icons.ToolboxIcon className='dashboard_icon' />,
      sysName: 'toolbox'
    },
    {
      name: 'Deals',
      link: '/dashboard/user/deals',
      icon: <Icons.DealsIcon className='dashboard_icon' />,
      sysName: 'deals'
    },
    {
      name: 'Settings',
      link: '/dashboard/user/settings',
      icon: <Icons.SettingIcon className='dashboard_icon' />,
      sysName: 'settings'
    }
    // {
    //   name: 'Support',
    //   link: '/dashboard/user/support',
    //   icon: <Icons.SupportIcon className='dashboard_icon' />,
    //   sysName: 'support'
    // }
  ]
  const { isLoading, data } = useQuery('profile', () => getUserMe(), {
    staleTime: Infinity
  })
  if (!isLoading && !data) {
    console.log(!isLoading && !data)
    // redirect('/login')
  }
  if (isMobile) {
    return <MobileBlocker />
  }
  return (
    <div className={styles.wrapper}>
      <SideBar items={navItems} />
      <main className='dashboard'>
        <Header />
        {children}
      </main>
    </div>
  )
}

export default Layout

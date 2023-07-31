'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { getCookie } from 'cookies-next'
import { motion } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'

import styles from './Header.module.scss'

import CountriesDropdown from '@components/Menu/CountriesDropdown'

import { PAGE_SLUGS } from '@constants/pages'

import CartSVG from '@assets/Icons/cart.svg'
import CartMobileSVG from '@assets/Icons/cart-mobile.svg'
import LogoMobileSVG from '@assets/Icons/logo-mobile.svg'
import RobotMobileLeftSVG from '@assets/Icons/robots/robot-menu-mobile-1.svg'
import RobotMobileRightSVG from '@assets/Icons/robots/robot-menu-mobile-2.svg'
import RobotTabletLeftSVG from '@assets/Icons/robots/robot-menu-tablet-1.svg'
import RobotTabletRightSVG from '@assets/Icons/robots/robot-menu-tablet-2.svg'
import LogoSVG from '@assets/Images/logo-white.svg'

const headerAnimation = {
  initial: {
    y: -100,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1
  }
}

const links = [
  { title: 'Home', path: PAGE_SLUGS.home },
  { title: 'Marketplace', path: PAGE_SLUGS.marketplace }
  // { title: 'For brands', path: '#' },
  // { title: 'Support', path: '#' }
]

const Header = ({ dark }: { dark?: any }) => {
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [defaultLanguage, setDefaultLanguage] = useState<any>('EN')
  const [menuToggle, setMenuToggle] = useState<boolean>(false)
  const [isOpenMenuMobile, setIsOpenMenuMobile] = useState<boolean>(false)
  const router = useRouter()
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState<string | null | undefined | boolean>(null)
  const roleCookie = getCookie('Role')
  const isMobile = useMediaQuery({ maxWidth: 767 })

  const bodyElement = useMemo(
    () => (typeof document !== 'undefined' ? document.querySelector('body') : null),
    []
  ) as HTMLBodyElement

  const toggleDropdownCountry = () => {
    setMenuToggle((prev) => !prev)
  }

  useEffect(() => {
    return setIsLoggedIn(roleCookie)
  }, [roleCookie])

  useEffect(() => {
    const onScroll = () => {
      if (pathname === PAGE_SLUGS.home || pathname === PAGE_SLUGS.marketplace || PAGE_SLUGS.cart) {
        if (window.scrollY > 5) {
          setScrolled(true)
        } else {
          setScrolled(false)
        }
      }
    }

    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  useEffect(() => {
    if (isOpenMenuMobile) {
      bodyElement.classList.add('disabled')
    }

    return () => bodyElement.classList.remove('disabled')
  }, [isOpenMenuMobile])

  const singleMarketplace = pathname?.includes(PAGE_SLUGS.marketplace) && PAGE_SLUGS.marketplace

  return (
    <motion.header
      initial='initial'
      animate='visible'
      transition={{ delay: 0.5, type: 'spring' }}
      variants={headerAnimation}
      style={{ background: dark && '#070233' }}
      className={`${scrolled ? styles.scrolled : ''} ${styles.header} ${
        isOpenMenuMobile ? styles.open : ''
      }`}
    >
      <Link href={PAGE_SLUGS.home} className={styles.header__logo}>
        <LogoSVG />
      </Link>
      <nav className={styles.header__navigation}>
        {links.map((link: any) => (
          <Link
            key={link.title}
            href={link.path}
            className={`${
              (pathname === link.path || link.path === singleMarketplace) &&
              styles.header__navigationLinkActive
            } ${styles.header__navigationLink}`}
          >
            {link.title}
          </Link>
        ))}
      </nav>
      <div className={styles.header__info}>
        <div className={styles.header__infoMenu}>
          <CartSVG
            onClick={() => router.push(PAGE_SLUGS.cart)}
            className={styles.header__infoMenuCart}
          />
          <div className={styles.header__infoMenuLine}></div>
          <span className={styles.header__infoMenuLanguage} onClick={toggleDropdownCountry}>
            {defaultLanguage}
            {menuToggle ? (
              <CountriesDropdown
                setMenuToggle={setMenuToggle}
                setDefaultLanguage={setDefaultLanguage}
              />
            ) : null}
          </span>
        </div>

        <motion.div
          initial='initial'
          animate='visible'
          transition={{ delay: 0.7, type: 'spring' }}
          variants={headerAnimation}
          className={styles.header__infoAuth}
        >
          {isLoggedIn ? (
            <Link
              className={styles.header__infoAuthLink}
              href={isLoggedIn === 'Brand' ? PAGE_SLUGS.brandProfile : PAGE_SLUGS.userProfile}
            >
              User profile
            </Link>
          ) : (
            <>
              <Link href={PAGE_SLUGS.login} className={styles.header__infoAuthLink}>
                Log in
              </Link>
              <Link href={PAGE_SLUGS.register} className={styles.header__infoAuthLink}>
                Sign up
              </Link>
            </>
          )}
        </motion.div>
      </div>

      {/* Mobile */}
      <Link href={PAGE_SLUGS.home} className={styles.header__logoMobile}>
        <LogoMobileSVG />
      </Link>
      <motion.div layout className={styles.header__infoMobile}>
        <CartMobileSVG onClick={() => router.push(PAGE_SLUGS.cart)} />
        <div className={styles.header__menuMobile}>
          <button
            className={styles.header__hamburger}
            onClick={() => setIsOpenMenuMobile(!isOpenMenuMobile)}
          >
            <span
              className={`${styles.header__hamburgerLine} ${
                isOpenMenuMobile ? styles.header__hamburgerLineOpen : ''
              }`}
            ></span>
            <span
              className={`${styles.header__hamburgerLine} ${
                isOpenMenuMobile ? styles.header__hamburgerLineOpen : ''
              }`}
            ></span>
            <span
              className={`${styles.header__hamburgerLine} ${
                isOpenMenuMobile ? styles.header__hamburgerLineOpen : ''
              }`}
            ></span>
          </button>

          {isOpenMenuMobile && (
            <div className={styles.header__navigationMobile}>
              <div className={styles.header__navigationMobileWrapper}>
                <nav className={styles.header__navigationMobilePagesLinks}>
                  {links.map((link: any) => (
                    <Link
                      key={link.title}
                      href={link.path}
                      className={`${
                        (pathname === link.path || link.path === singleMarketplace) &&
                        styles.header__navigationLinkActive
                      } ${styles.header__navigationLink}`}
                    >
                      {link.title}
                    </Link>
                  ))}
                </nav>
                <div className={styles.header__navigationMobileAuth}>
                  <Link href={PAGE_SLUGS.login} className={styles.header__navigationMobileAuthLink}>
                    Log in
                  </Link>
                  <Link
                    href={PAGE_SLUGS.register}
                    className={styles.header__navigationMobileAuthLink}
                  >
                    Sign up
                  </Link>
                </div>

                {isMobile ? (
                  <RobotMobileLeftSVG className={styles.header__navigationMobileRobotLeft} />
                ) : (
                  <RobotTabletLeftSVG className={styles.header__navigationMobileRobotLeft} />
                )}
                {isMobile ? (
                  <RobotMobileRightSVG className={styles.header__navigationMobileRobotRight} />
                ) : (
                  <RobotTabletRightSVG className={styles.header__navigationMobileRobotRight} />
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.header>
  )
}

export default Header

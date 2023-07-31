'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'
import useRootStore from '@store/RootStore'

import styles from './Footer.module.scss'

import { PAGE_SLUGS } from '@constants/pages'

// import FacebookSVG from '@assets/Icons/social/facebook-small.svg'
import InstagramSVG from '@assets/Icons/social/instagram-small.svg'
import LinkedinSVG from '@assets/Icons/social/linkedin-small.svg'
import TwitterSVG from '@assets/Icons/social/twitter-small.svg'
import LogoSVG from '@assets/Images/logo-footer.svg'

const footerAnimation = {
  hidden: {
    y: 50,
    opacity: 0
  },
  visible: (custom: any) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.7 }
  })
}
const Footer = () => {
  const { cartStore } = useRootStore()
  const isTablet = useMediaQuery({ maxWidth: 992 })

  return (
    <>
      {cartStore.step === 3 && isTablet ? null : (
        <motion.footer
          initial='hidden'
          whileInView='visible'
          viewport={{ amount: 0.1, once: true }}
          className={styles.footer}
        >
          <div className={styles.footer__top}>
            <motion.div variants={footerAnimation} custom={0.7} className={styles.footer__topLeft}>
              <LogoSVG
                className={styles.footer__topLeftLogo}
                onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })}
              />
              <div className={styles.footer__topLeftLinksWrapper}>
                <Link
                  href={PAGE_SLUGS.marketplace}
                  className={styles.footer__topLeftLinksWrapperLink}
                >
                  Marketplace
                </Link>
                <Link
                  href={PAGE_SLUGS.marketplace}
                  className={styles.footer__topLeftLinksWrapperLink}
                >
                  For brands
                </Link>
                <Link
                  href={PAGE_SLUGS.marketplace}
                  className={styles.footer__topLeftLinksWrapperLink}
                >
                  Support
                </Link>
                <Link
                  href={PAGE_SLUGS.marketplace}
                  className={styles.footer__topLeftLinksWrapperLink}
                >
                  About Monetiseur
                </Link>
              </div>
            </motion.div>
            <motion.div variants={footerAnimation} custom={1.2} className={styles.footer__topRight}>
              <span className={styles.footer__topRightSubscribe}>
                Subscribe to get last news and insights
              </span>
              <form className={styles.footer__topRightForm}>
                <input
                  type='email'
                  className={styles.footer__topRightFormInput}
                  placeholder='Enter your email'
                />
                <button className={styles.footer__topRightFormBtn}>Subscribe</button>
              </form>
            </motion.div>
          </div>
          <div className={styles.footer__bottom}>
            <motion.div variants={footerAnimation} custom={2} className={styles.footer__bottomLeft}>
              <Link
                href={process.env.NEXT_PUBLIC_PRIVACY_POLICY as string}
                className={styles.footer__bottomLeftLink}
              >
                Privacy policy
              </Link>
              <a href='components/Lay/Footer' className={styles.footer__bottomLeftLink}>
                Terms of service
              </a>
              <Link
                href={process.env.NEXT_PUBLIC_COOKIES_POLICY as string}
                className={styles.footer__bottomLeftLink}
              >
                Cooking settings
              </Link>
            </motion.div>
            <motion.div
              variants={footerAnimation}
              custom={2.5}
              className={styles.footer__bottomRight}
            >
              <a
                href='https://twitter.com/monetiseur_io'
                target='_blank'
                className={styles.footer__bottomRightLinkWrap}
              >
                <TwitterSVG />
              </a>
              {/*<div className={styles.footer__bottomRightLinkWrap}>*/}
              {/*  <LinkedinSVG />*/}
              {/*</div>*/}
              <a
                href='https://www.linkedin.com/company/monetiseur/'
                target='_blank'
                className={styles.footer__bottomRightLinkWrap}
              >
                <LinkedinSVG />
              </a>
              <a
                href='https://www.instagram.com/monetiseur.io/'
                target='_blank'
                className={styles.footer__bottomRightLinkWrap}
              >
                <InstagramSVG />
              </a>
            </motion.div>
          </div>
        </motion.footer>
      )}
    </>
  )
}

export default Footer

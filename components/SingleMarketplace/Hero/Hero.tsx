'use client'
import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import moment from 'moment/moment'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import Skeleton from 'react-loading-skeleton'
import { useMediaQuery } from 'react-responsive'

import styles from './Hero.module.scss'

import useGetAllProducts from '@hooks/Marketplace/useGetAllProducts'

import { SingleMarketplaceContext } from '@context/SingleMarketplace/SingleMarketplaceContext'

import LogoPartner from '@assets/Icons/logo-parter.svg'
import NationSVG from '@assets/Icons/nation.svg'
import FacebookSVG from '@assets/Icons/social/facebook-small.svg'
import InstagramSVG from '@assets/Icons/social/instagram-small.svg'
import TikTokSVG from '@assets/Icons/social/tik-tok-small.svg'
import TwitchSVG from '@assets/Icons/social/twitch-small.svg'
import TwitterSVG from '@assets/Icons/social/twitter-smallSmall.svg'
import YouTubeSVG from '@assets/Icons/social/youTube-small.svg'
import FederationImage from '@assets/Images/federation/hero/federation.svg'
import FederationBgImage from '@assets/Images/federation/hero/hero-bg.png'
import HeroBanner from '@assets/Images/single-marketplace/hero/hero-banner.png'

const Hero = () => {
  const {
    isLoading,
    isFederateUrlPath,
    isSuccess,
    singleSportsmenInfo,
    mediaChannels,
    mediaChannelsRevalidate
  } = useGetAllProducts()
  const isTablet = useMediaQuery({ maxWidth: 992 })
  const [viewBtn, setViewBtn] = useState<boolean>(true)
  const context = useContext(SingleMarketplaceContext)
  const getMediaLogoSVG = (name: string) => {
    switch (name) {
      case 'TikTok':
        return <TikTokSVG />
      case 'Instagram':
        return <InstagramSVG />
      case 'Facebook':
        return <FacebookSVG />
      case 'YouTube':
        return <YouTubeSVG />
      case 'Twitch':
        return <TwitchSVG />
      case 'Twitter':
        return <TwitterSVG />
      default:
        return <TikTokSVG />
    }
  }

  useEffect(() => {
    mediaChannelsRevalidate()
  }, [])

  useEffect(() => {
    if (context?.platforms?.length) {
      setViewBtn(true)
    } else {
      setViewBtn(false)
    }
  }, [context?.platforms?.length])

  return (
    <section className={styles.hero}>
      <div className={styles.hero__banner}>
        {isFederateUrlPath ? (
          <Image
            src={FederationBgImage}
            height={500}
            className={styles.hero__bannerImage}
            alt='Federate banner'
          />
        ) : singleSportsmenInfo?.right_holder?.background_link ? (
          <img
            // @ts-ignore
            src={
              singleSportsmenInfo?.right_holder?.background_link && isSuccess
                ? singleSportsmenInfo?.right_holder?.background_link
                : HeroBanner
            }
            className={styles.hero__bannerImage}
            alt={String(singleSportsmenInfo?.right_holder?.first_name)}
          />
        ) : (
          <Image
            src={HeroBanner}
            height={500}
            className={styles.hero__bannerImage}
            alt='Federate banner'
          />
        )}
      </div>
      <div className={styles.hero__content}>
        <div className={styles.hero__info}>
          <div className={styles.hero__infoAvatar}>
            {isFederateUrlPath ? (
              <FederationImage className={styles.hero__infoAvatarImage} width={265} height={265} />
            ) : isLoading ? (
              <Skeleton className={styles.hero__infoAvatarSkeleton} />
            ) : (
              <img
                src={String(singleSportsmenInfo?.right_holder?.link)}
                className={styles.hero__infoAvatarImage}
                alt={singleSportsmenInfo?.right_holder?.first_name || 'User'}
              />
            )}
          </div>
          <div className={styles.hero__infoUser}>
            <div className={styles.hero__infoUserHead}>
              <h4 className={styles.hero__infoUserName}>
                {isFederateUrlPath ? (
                  'International Judo Federation'
                ) : isLoading ? (
                  <Skeleton />
                ) : (
                  `${singleSportsmenInfo?.right_holder?.first_name} ${singleSportsmenInfo?.right_holder?.last_name}`
                )}
              </h4>
              <div className={styles.hero__infoUserWrapper}>
                {isTablet ? (
                  <span className={styles.hero__infoUserYears}>
                    {singleSportsmenInfo?.right_holder?.date_of_birth
                      ? `${moment().diff(
                          singleSportsmenInfo?.right_holder?.date_of_birth,
                          'years'
                        )} years old`
                      : null}
                  </span>
                ) : (
                  <LogoPartner />
                )}
                {isFederateUrlPath ? null : (
                  <>
                    {singleSportsmenInfo?.right_holder?.date_of_birth ? <span>|</span> : null}
                    <div className={styles.hero__infoUserNation}>
                      <NationSVG />
                      <span>{singleSportsmenInfo?.right_holder?.country_name}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            <span className={styles.hero__infoUserQualification}>
              {isFederateUrlPath ? (
                'Judo family | #worldjudo'
              ) : isLoading ? (
                <Skeleton />
              ) : (
                singleSportsmenInfo?.right_holder?.qualification
              )}
            </span>
            {isFederateUrlPath ? null : singleSportsmenInfo?.right_holder?.date_of_birth ? (
              isTablet ? null : (
                <span className={styles.hero__infoUserYears}>
                  {`${moment().diff(
                    singleSportsmenInfo?.right_holder?.date_of_birth,
                    'years'
                  )} years old`}
                </span>
              )
            ) : null}
          </div>
        </div>
        <div className={styles.hero__links}>
          {viewBtn ? (
            <AnchorLink href='#media-inventory' className={styles.hero__linksBtn}>
              Let’s Cooperate!
            </AnchorLink>
          ) : null}
          <div className={styles.hero__linksSocialWrapper}>
            {mediaChannels &&
              mediaChannels.media_channels_list
                .filter((el) => el.media_type !== 'Web' && el.url !== null && el.url !== '')
                .map((el) => (
                  <span className={styles.hero__linksSocialWrapperItem} key={el.pk}>
                    {/*@ts-ignore*/}
                    <Link href={el.url}>{getMediaLogoSVG(el.media_type)}</Link>
                  </span>
                ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

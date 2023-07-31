'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'

import styles from './SportFamilyList.module.scss'

import { PAGE_SLUGS } from '@constants/pages'

import LikeSVG from '@assets/Icons/likes/like.svg'
import LikeActiveSVG from '@assets/Icons/likes/like-acive.svg'

const SportsFamilyListItem = ({ item }: { item: any }) => {
  const [likeActive, setLikeActive] = useState<boolean>(false)

  const onClickUserProfile = (e: any) => {
    e.preventDefault()
    setLikeActive((prev) => !prev)
  }

  return (
    <Link
      href={`${PAGE_SLUGS.marketplace}/${item?.right_holder?.rights_holder_sub}`}
      className={styles.list__cart}
    >
      <div className={styles.list__cartTopBlock}>
        {item?.right_holder?.country?.country_code ? (
          <Image
            src={`/countries/${item?.right_holder?.country?.country_code}.svg`}
            alt={item?.right_holder?.country?.country_code}
            width={26}
            height={17}
            loading={'eager'}
            className={styles.sportsFamily__cartTopImg}
          />
        ) : null}
        <span className={styles.list__cartTopCounty}>{item.right_holder.country_name}</span>
        <div className={styles.list__cartTopLine}></div>
        <span className={styles.list__cartTopKingOfSport}>
          {item.right_holder.kind_of_sport.name}
        </span>
      </div>
      <div className={styles.list__cartImgWrapper}>
        {item.right_holder.link ? (
          <img loading='lazy' src={item.right_holder.link} alt={item.right_holder.first_name} />
        ) : (
          <Skeleton className={styles.list__cartSkeleton} />
        )}
        {likeActive ? (
          <LikeActiveSVG
            onClick={onClickUserProfile}
            width={35}
            height={35}
            className={styles.list__cartFavorites}
          />
        ) : (
          <LikeSVG
            onClick={onClickUserProfile}
            width={35}
            height={35}
            className={styles.list__cartFavorites}
          />
        )}
      </div>
      <div className={styles.list__cartWrapper}>
        <h4 className={styles.list__cartWrapperName}>
          {`${item?.right_holder?.first_name} ${item?.right_holder?.last_name}`}
        </h4>
        <span className={styles.list__cartWrapperPrice}>
          From <strong>€{item?.min_price ? item?.min_price?.toFixed() : 1}</strong>
        </span>
      </div>
    </Link>
  )
}

export default SportsFamilyListItem

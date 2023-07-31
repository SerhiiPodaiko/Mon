'use client'
import { FC } from 'react'
import { motion } from 'framer-motion'

import styles from './SportFamilyList.module.scss'

import SportsFamilyListItem from '@components/Marketplace/SportsFamily/components/List/SportsFamilyListItem'

import Preloader from '@ui/Preloader/Preloader'

import ArrowDownSVG from '@assets/Icons/arrows/down-arrow.svg'

type SportsFamilyListProps = {
  data: any
  visibleItems: number
  visibleItemsSorted: any
  isLoading: boolean
  handleLoadMore: () => void
}

const SportsFamilyList: FC<SportsFamilyListProps> = ({
  data,
  visibleItems,
  visibleItemsSorted,
  isLoading,
  handleLoadMore
}) => {
  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <motion.div layout className={styles.list}>
            {visibleItemsSorted?.length === 0 ? (
              <span className={styles.list__emptyTitle}>The list is empty</span>
            ) : (
              visibleItemsSorted
                ?.slice(0, visibleItems)
                .map((item: any) => (
                  <SportsFamilyListItem key={item?.right_holder?.rights_holder_sub} item={item} />
                ))
            )}
          </motion.div>
          <div className={styles.btnLoadWrapper}>
            {!visibleItemsSorted?.length || visibleItems >= data?.items?.length ? null : (
              <button type='button' onClick={handleLoadMore} className={styles.btnLoad}>
                <span>Load more</span>
                <ArrowDownSVG />
              </button>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default SportsFamilyList

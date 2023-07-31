'use client'
import { useContext, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

import styles from './MediaInventory.module.scss'

import useGetAllProducts from '@hooks/Marketplace/useGetAllProducts'

import { SingleMarketplaceContext } from '@context//SingleMarketplace/SingleMarketplaceContext'

import MediaInventoryList from './components/MediaInventoryList'

const MediaInventory = () => {
  const sliderRef = useRef<any>(null)
  const urlPath = usePathname()
  const { singleSportsmenInfo, isFederateUrlPath } = useGetAllProducts()
  const context = useContext(SingleMarketplaceContext)

  const isPublic = urlPath?.includes('federate')

  const handleSelected = (index: number) => {
    sliderRef?.current?.slickGoTo(index)
    context?.setSelectedTypeIndex(index)
  }

  return (
    <>
      {isFederateUrlPath ? null : context?.platforms?.length ? (
        <section className={styles.mediaInventory} id='media-inventory'>
          <div className={styles.mediaInventory__head}>
            <h2 className={styles.mediaInventory__headTitle}>
              {isPublic
                ? 'IJF’s media inventory'
                : singleSportsmenInfo?.right_holder?.first_name + '`s media inventory'}
            </h2>
          </div>
          <motion.div layout className={styles.mediaInventory__slider}>
            <MediaInventoryList
              handleSelected={handleSelected}
              platforms={context?.platforms}
              sliderRef={sliderRef}
            />
            {/*<div className={styles.mediaInventory__slider__btnNext}>*/}
            {/*  <NextArrowSVG onClick={nextElement} />*/}
            {/*</div>*/}
          </motion.div>
        </section>
      ) : null}
    </>
  )
}

export default MediaInventory

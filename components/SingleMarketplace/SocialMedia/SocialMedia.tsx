'use client'
import { useContext, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

import styles from './SocialMedia.module.scss'

import useGetAllProducts from '@hooks/Marketplace/useGetAllProducts'

import { SingleMarketplaceContext } from '@context//SingleMarketplace/SingleMarketplaceContext'

import SocialMediaList from './components/SocialMediaList'

import NextArrow from '@assets/Icons/arrows/next-large.svg'

const SocialMedia = () => {
  const sliderRef = useRef<any>(null)
  const [categoryType, setCategoryType] = useState<string>('')
  const { isFederateUrlPath } = useGetAllProducts()

  const context = useContext(SingleMarketplaceContext)

  const categories: any = {}
  let filteredProducts =
    context?.products &&
    context.products.filter((product: any) => {
      if (
        product.platforms[Object.keys(product.platforms)[0]] ===
        context?.platforms[context?.selectedTypeIndex]?.title
      ) {
        Object.keys(product?.categories).forEach((group) => {
          categories[group] = product?.categories[group]
        })

        return true
      }

      return false
    })

  useEffect(() => {
    const allCategories: any = Object.values(categories)
    const firstEl: string = allCategories.length ? allCategories[0] : ''
    setCategoryType(firstEl)
  }, [context?.selectedTypeIndex])

  useEffect(() => {
    const allCategories: any = Object.values(categories)
    if (categoryType === '' && allCategories.length) {
      const firstEl: string = allCategories.length ? allCategories[0] : ''
      setCategoryType(firstEl)
    }
  }, [categories])

  filteredProducts =
    filteredProducts &&
    filteredProducts.filter((product: any) =>
      categoryType === ''
        ? true
        : Object.values(product?.categories).filter((catName) => catName === categoryType).length
    )

  return (
    <>
      {isFederateUrlPath ? null : filteredProducts?.length ? (
        <section className={styles.socialMedia}>
          <div className={styles.socialMedia__head}>
            <h2 className={styles.socialMedia__headTitle}>
              {filteredProducts && filteredProducts[0]?.platformName} items
            </h2>
            <div className={styles.socialMedia__headArrow}>
              <NextArrow />
            </div>
            <motion.div layout className={styles.socialMedia__headTags}>
              {Object.keys(categories).map((groupId: any) => (
                <span
                  key={groupId}
                  onClick={() => setCategoryType(categories[groupId])}
                  className={`${styles.socialMedia__headTagsBtn} ${
                    categories[groupId] === categoryType && styles.socialMedia__headTagsBtnActive
                  }`}
                >
                  {categories[groupId]}
                </span>
              ))}
            </motion.div>
          </div>
          <motion.div layout className={styles.socialMedia__list}>
            <SocialMediaList userProducts={filteredProducts} sliderRef={sliderRef} />
          </motion.div>
        </section>
      ) : null}
    </>
  )
}

export default SocialMedia

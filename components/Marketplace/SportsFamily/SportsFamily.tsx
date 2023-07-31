'use client'
import { ChangeEvent, useDeferredValue, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'

import styles from './SportsFamily.module.scss'

import { PublicProduct } from '@lib/api/Marketplace/models'

import useGetAllProducts from '@hooks/Marketplace/useGetAllProducts'

import Filter from './components/Filter/Filter'
import SportsFamilyList from './components/List/SportsFamilyList'

const SportsFamily = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const [filterModal, setFilterModal] = useState<boolean>(false)
  const { data, isLoading } = useGetAllProducts()
  const [visibleItems, setVisibleItems] = useState<number>(isMobile ? 2 : 4)
  const [sortOrder, setSortOrder] = useState<string>('recommended')
  const [searchValue, setSearchValue] = useState<string>('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [categorySport, setCategorySport] = useState('All')
  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 4)
  }

  const handleSortChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSortOrder(event.target.value)
  }

  const handleSearch = () => {
    const searchValue = searchInputRef.current?.value.toLowerCase() ?? ''
    setTimeout(() => setSearchValue(searchValue), 200)
  }

  const filteredItems = useMemo(() => {
    const searchValue = searchInputRef.current?.value.toLowerCase() ?? ''

    if (categorySport === 'All') {
      return data?.items?.filter((item: PublicProduct) =>
        item.right_holder.country_name.toLowerCase().includes(searchValue)
      )
    }

    return data?.items?.filter(
      (item: PublicProduct) =>
        item.right_holder.country_name.toLowerCase().includes(searchValue) &&
        item.right_holder.kind_of_sport.name === categorySport
    )
  }, [data, searchValue, categorySport])

  const visibleItemsSorted = useMemo(() => {
    if (sortOrder === 'recommended') {
      return filteredItems?.sort(() => Math.random() - 0.5)
    }

    return filteredItems?.sort((a: any, b: any) => {
      if (sortOrder === 'asc') {
        return a.min_price - b.min_price
      } else if (sortOrder === 'desc') {
        return b.min_price - a.min_price
      } else {
        return 0
      }
    })
  }, [filteredItems, sortOrder, isMobile])

  const items = useDeferredValue(visibleItemsSorted)

  return (
    <section className={styles.sportsFamily} id='sports-family'>
      <div className={styles.sportsFamily__head}>
        <h2 className={styles.sportsFamily__headTitle}>meet our</h2>
        <p className={styles.sportsFamily__headSubtitle}>
          <span>Sports </span>
          Family
        </p>
      </div>
      <motion.div layout className={styles.sportsFamily__content}>
        <Filter
          data={data}
          setCategorySport={setCategorySport}
          searchInputRef={searchInputRef}
          handleSearch={handleSearch}
          sortOrder={sortOrder}
          handleSortChange={handleSortChange}
          filterModal={filterModal}
          setFilterModal={setFilterModal}
        />
        <motion.div layout>
          <SportsFamilyList
            data={data}
            visibleItems={visibleItems}
            handleLoadMore={handleLoadMore}
            isLoading={isLoading}
            visibleItemsSorted={items}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default SportsFamily

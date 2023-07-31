'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import 'swiper/scss/navigation'
import { useQuery } from 'react-query'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/swiper-bundle.css'
import styles from './Categories.module.scss'

import ProductCard from '@components/UserDashboard/Toolbox/mainPage/ProductCard/ProductCard'

import { getCategories } from '@lib/api/Dashboard/RightsHolder/user/toolbox/getCategories'
import { getCategoriesAsRH } from '@lib/api/Dashboard/RightsHolder/user/toolbox/getCategoriesAsRH'

import Preloader from '@ui/Preloader/Preloader'

import ArrowLeftInactive from '@assets/UserDashboard/toolbox/icons/arrowLeftInactive.svg'
import GroupIcon from '@assets/UserDashboard/toolbox/icons/groupIcon.svg'

type Card = {
  key: string
  name: string
  description: string
  groupName: string
  groupIcon: string | null
  active: boolean
  available?: number
  price?: number
  image: string
}

type DisplayData = {
  title: string
  category_id: string
  filterMenu: boolean
  filterOptions: { name: string; icon: string }[]
  cards: Card[]
}

const Categories = () => {
  // State variables
  const [nav, setNav] = useState<Array<any>>([])
  const [domLoaded, setDomLoaded] = useState(false)
  const [filterOptions, setFilterOptions] = useState<{ categoryID: string; filter: string }[]>([])

  const { data } = useQuery('categories', () => getCategories(), {
    staleTime: Infinity
  })

  const { data: holderCategories } = useQuery('categoriesRH', () => getCategoriesAsRH(), {
    staleTime: Infinity
  })

  const router = useRouter()

  useEffect(() => {
    setDomLoaded(true)
    const navItems: any = []
    displayData.forEach(() => navItems.push(null))
    setNav(navItems)
  }, [])

  const displayData: DisplayData[] = []

  if (data && holderCategories) {
    for (const category of data) {
      // Find the display category object if it already exists
      let displayCat = displayData.find(
        (el) => el.category_id === category.product_category_platform_id
      )
      // If the display category object does not exist, create it
      if (!displayCat) {
        displayData.push({
          title: category.product_category_platform_name,
          category_id: category.product_category_platform_id,
          filterMenu: category.product_category_platform_filter_in_title || false,
          filterOptions: [],
          cards: []
        })
      }
      // Find the display category object
      displayCat = displayData.find(
        (el) => el.category_id === category.product_category_platform_id
      ) as DisplayData
      const cardsToPush: Card[] = []
      for (const group of category.product_category_groups) {
        for (const groupCategory of group.product_category_categories) {
          const holderItem = holderCategories.items.find(
            (el) => el.ProductModel.product_category_id === groupCategory.product_category_id
          )
          // Check if the filter menu is enabled
          if (displayCat.filterMenu) {
            // Add the filter option if it does not exist
            if (
              !displayCat.filterOptions.some(
                (el) => el.name === groupCategory.product_category_name
              )
            ) {
              displayCat.filterOptions.push({
                name: groupCategory.product_category_name,
                icon: groupCategory.product_category_icon
              })
            }
          }
          // Push the card object to the cards array
          cardsToPush.push({
            key: groupCategory.product_category_id,
            name: group.product_category_group_name,
            description: groupCategory.product_category_description || '',
            groupName: groupCategory.product_category_name,
            groupIcon: groupCategory.product_category_icon,
            available: holderItem?.ProductModel.product_available_count,
            price: holderItem?.ProductModel.product_price,
            active: holderItem?.ProductModel.product_show || false,
            image: groupCategory.product_category_picture
          })
        }
      }
      // Push the cards to the display category object
      displayCat.cards.push(...cardsToPush)
    }
  }

  // Function to check the status of navigation buttons
  const checkNavBtnsStatus = (index: number) => {
    // Get the previous and next buttons using querySelector
    const prevBtn = document.querySelector(`#prev-button-${index}`)
    const nextBtn = document.querySelector(`#next-button-${index}`)

    // Check if the buttons exist
    if (prevBtn && nextBtn) {
      if (!nav[index].isBeginning) {
        // Add the active class to the previous button if not at the beginning
        prevBtn.classList.add(styles.toolbox__sectionArrowLeft_active)
      } else {
        // Remove the active class from the previous button if at the beginning
        prevBtn.classList.remove(styles.toolbox__sectionArrowLeft_active)
      }
      if (!nav[index].isEnd) {
        // Add the active class to the next button if not at the end
        nextBtn.classList.add(styles.toolbox__sectionArrowRight_active)
      } else {
        // Remove the active class from the next button if at the end
        nextBtn.classList.remove(styles.toolbox__sectionArrowRight_active)
      }
    }
  }

  // Handle click on the previous button
  const handlePrevClick = (index: number) => {
    nav[index].slidePrev()
    checkNavBtnsStatus(index)
  }

  // Handle click on the next button
  const handleNextClick = (index: number) => {
    nav[index].slideNext()
    checkNavBtnsStatus(index)
  }

  // Handle click on the filter option
  const handleFilterOptionClick = (categoryID: string, filter: string) => {
    // Check if the filter option is already selected
    const filterOption = filterOptions.find(
      (el) => el.categoryID === categoryID && el.filter === filter
    )
    if (filterOption) {
      // Remove the filter option if it is already selected
      setFilterOptions((state) =>
        state.filter((el) => el.categoryID !== categoryID || el.filter !== filter)
      )
    } else {
      // Add the filter option if it is not already selected
      setFilterOptions((state) => [...state, { categoryID, filter }])
    }
  }

  // Filter callback to filter cards
  const filterCallback = (card: Card, categoryId: string) => {
    if (filterOptions.some((el) => el.categoryID === categoryId)) {
      return filterOptions.some(
        (el) => el.categoryID === categoryId && el.filter === card.groupName
      )
    }
    return true
  }

  if (!data || !holderCategories || !domLoaded) {
    return <Preloader />
  }
  return (
    <>
      {/* Render the display data */}
      {displayData.map(
        (category, index: number) =>
          category.cards.length > 0 && (
            <div className={styles.toolbox__section} key={`${category.category_id}`}>
              <div className={styles.toolbox__sectionTop}>
                <div className={styles.toolbox__titleWrapper}>
                  <span className={styles.toolbox__sectionTitle}>{category.title}</span>
                  {/* Render filter menu */}
                  <div className={styles.toolbox__filterMenu}>
                    {category.filterMenu &&
                      category.filterOptions.length > 0 &&
                      category.filterOptions.map((filterOption) => (
                        <span
                          className={`${styles.toolbox__filterItem} ${
                            filterOptions.some(
                              (el) =>
                                el.categoryID === category.category_id &&
                                el.filter === filterOption.name
                            )
                              ? styles.toolbox__filterItem_active
                              : ''
                          }`}
                          key={filterOption.name}
                          onClick={() =>
                            handleFilterOptionClick(category.category_id, filterOption.name)
                          }
                        >
                          {filterOption.icon ? (
                            <img
                              loading='lazy'
                              alt={'Image'}
                              className={styles.toolboxCard__groupWrapper}
                              src={filterOption.icon}
                            />
                          ) : (
                            <GroupIcon />
                          )}
                          <span>{filterOption.name}</span>
                        </span>
                      ))}
                  </div>
                </div>
                <div className={styles.toolbox__sectionArrows}>
                  {/* Render the previous button */}
                  <ArrowLeftInactive
                    id={`prev-button-${index}`}
                    onClick={() => handlePrevClick(index)}
                    className={styles.toolbox__sectionArrowLeft}
                  />
                  {/* Render the next button */}
                  <ArrowLeftInactive
                    id={`next-button-${index}`}
                    onClick={() => handleNextClick(index)}
                    className={`${styles.toolbox__sectionArrowRight} ${styles.toolbox__sectionArrowRight_active}`}
                  />
                </div>
              </div>
              {/* Render the Swiper component */}
              <div className={styles.toolbox__sectionBottomBlock}>
                {domLoaded && (
                  <Swiper
                    onSwiper={(swiper) => (nav[index] = swiper)}
                    className={styles.toolbox__sectionBottom}
                    draggable={false}
                    slidesPerView={'auto'}
                    loop={false}
                    direction={'horizontal'}
                  >
                    {/* Render the swiper slides */}
                    {category.cards
                      .sort((a, b) => {
                        if (a.available === 0 && b.available !== 0) return -1
                        if (b.available === 0 && a.available !== 0) return 1

                        if (a.active && !b.active) return -1
                        if (!a.active && b.active) return 1
                        return 0
                      })
                      .filter((card) => filterCallback(card, category.category_id))
                      .map((card, index) => (
                        <SwiperSlide
                          key={`${index}`}
                          className={`${styles.toolbox__sectionCart} ${
                            card.active ? styles.toolbox__sectionCart_active : ''
                          }`}
                          onClick={() => router.push(`/dashboard/user/toolbox/${card.key}`)}
                        >
                          <ProductCard
                            id={card.key}
                            name={card.name}
                            description={card.description}
                            groupName={card.groupName}
                            groupIcon={card.groupIcon}
                            price={card.price}
                            count={card.available}
                            available={card.active}
                            image={card.image}
                          />
                        </SwiperSlide>
                      ))}
                  </Swiper>
                )}
              </div>
            </div>
          )
      )}
    </>
  )
}

export default Categories

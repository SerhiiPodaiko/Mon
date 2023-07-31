import { FC, useRef, useState } from 'react'
import 'swiper/css/navigation'
import { useMediaQuery } from 'react-responsive'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/swiper-bundle.css'
import styles from './Filter.module.scss'

import ClassicModal from '@ui/Modals/classicModal/ClassicModal'

import { filtersData } from './categoriesData'

import ArrowDownSVG from '@assets/Icons/arrows/arrow-down-right.svg'
import NextArrowSVG from '@assets/Icons/arrows/next-vilolet.svg'
import CheckBoxSVG from '@assets/Icons/checkbox/checkbox.svg'
import CloseSVG from '@assets/Icons/close-thin.svg'
import FilterSVG from '@assets/Icons/filters/filter.svg'
import SortSVG from '@assets/Icons/filters/sort.svg'
import SearchSVG from '@assets/Icons/search.svg'

type FilterProps = {
  data: any
  setCategorySport: (name: string) => void
  searchInputRef: any
  sortOrder: string
  handleSortChange: any
  handleSearch: any
  filterModal: boolean
  setFilterModal: (visible: boolean) => void
}

const Filter: FC<FilterProps> = ({
  data,
  setCategorySport,
  searchInputRef,
  filterModal,
  setFilterModal,
  sortOrder,
  handleSortChange,
  handleSearch
}) => {
  const [visibleCategories, setVisibleCategories] = useState<number>(6)
  const [sortDropDown, setSortDropDown] = useState<boolean>(false)
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const [slideActiveIndex, setSlideActiveIndex] = useState(-1)
  const swiperRef = useRef<any>(null)
  const handleSlideClick = (index: number, name: string) => {
    setCategorySport(name)
    setSlideActiveIndex(index)
  }

  const uniqueCategories = Array.from(
    new Set(data?.items?.map((categorie: any) => categorie?.right_holder?.kind_of_sport?.name))
  )

  const handleLoadMore = () => {
    setVisibleCategories((prevVisibleCategories) => prevVisibleCategories + 6)
  }

  return (
    <div className={styles.filter}>
      <header className={styles.filter__header}>
        <h4 className={styles.filter__title}>EXPLORE ATHLETES</h4>
        <form className={styles.filter__form}>
          <div className={styles.filter__formGroup}>
            <input
              type='text'
              className={styles.filter__formInput}
              ref={searchInputRef}
              onChange={handleSearch}
              placeholder='Type Language'
            />
            <SearchSVG className={styles.filter__formLocationIcon} onClick={handleSearch} />
          </div>
          <div className={styles.filter__formBtn} onClick={() => setFilterModal(true)}>
            <FilterSVG />
            {isMobile ? null : <span>Filters</span>}
          </div>
          <div className={styles.filter__formBtn} onClick={() => setSortDropDown(!sortDropDown)}>
            <SortSVG />
            {isMobile ? null : <span>Sort: Recommended</span>}
            {sortDropDown && (
              <ul className={styles.filter__sortList} onClick={(event) => event.stopPropagation()}>
                <li className={styles.filter__sortListItem}>
                  <input
                    type='radio'
                    name='sort'
                    value='recommended'
                    checked={sortOrder === 'recommended'}
                    onChange={handleSortChange}
                    className={styles.filter__sortListItemInput}
                  />
                  <span className={styles.filter__sortListItemCustomCheck}></span>
                  <span>Recommended</span>
                </li>
                <li className={styles.filter__sortListItem}>
                  <input
                    type='radio'
                    name='sort'
                    value='desc'
                    checked={sortOrder === 'desc'}
                    onChange={handleSortChange}
                    className={styles.filter__sortListItemInput}
                  />
                  <span className={styles.filter__sortListItemCustomCheck}></span>
                  <span>Price (High - Low)</span>
                </li>
                <li className={styles.filter__sortListItem}>
                  <input
                    type='radio'
                    name='sort'
                    value='asc'
                    checked={sortOrder === 'asc'}
                    onChange={handleSortChange}
                    className={styles.filter__sortListItemInput}
                  />
                  <span className={styles.filter__sortListItemCustomCheck}></span>
                  <span>Price (Low - High)</span>
                </li>
              </ul>
            )}
          </div>
        </form>
      </header>
      <div className={styles.filter__categories}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          ref={swiperRef}
          draggable={false}
          slidesPerView='auto'
          loop={false}
          direction='horizontal'
          className={styles.filter__categoriesSlider}
        >
          <SwiperSlide style={{ width: 'auto' }}>
            <span
              className={`${styles.filter__categoriesItem} ${
                slideActiveIndex === -1 ? styles.filter__categoriesItemActive : ''
              }`}
              onClick={() => handleSlideClick(-1, 'All')}
            >
              All
            </span>
          </SwiperSlide>
          {uniqueCategories?.map((categoryName: any, index: any) => (
            <SwiperSlide
              key={categoryName}
              className={styles.filter__swiperSlide}
              onClick={() => handleSlideClick(index, categoryName)}
            >
              <span
                className={`${styles.filter__categoriesItem}
                   ${slideActiveIndex === index ? styles.filter__categoriesItemActive : ''}`}
              >
                {categoryName}
              </span>
            </SwiperSlide>
          ))}
        </Swiper>
        {isMobile ? null : (
          <div className={styles.filter__categoriesSliderBtn}>
            <NextArrowSVG />
          </div>
        )}
      </div>

      {filterModal ? (
        <ClassicModal
          onClose={() => setFilterModal(false)}
          modal={filterModal}
          withCloseBtn={false}
        >
          <div className={styles.modal}>
            <header className={styles.modal__header}>
              <h3 className={styles.modal__title}>Filters</h3>
              <CloseSVG className={styles.modal__close} onClick={() => setFilterModal(false)} />
            </header>
            <form className={styles.modal__content}>
              <ul className={styles.modal__filterList}>
                <li className={styles.modal__filterListItem}>
                  <h3 className={styles.modal__filterListItemTitle}>Price</h3>
                  <div className={styles.modal__filterListItemWrapper}>
                    {filtersData.prices.map((item) => (
                      <label key={item.id} className={styles.modal__filterListItemLabel}>
                        <input type='checkbox' className={styles.modal__filterListItemInput} />
                        <div className={styles.modal__filterListItemCustomCheckbox}>
                          <CheckBoxSVG className={styles.modal__filterListItemCustomCheckboxImg} />
                        </div>
                        <span>{item.value}</span>
                      </label>
                    ))}
                  </div>
                </li>
                <li className={styles.modal__filterListItem}>
                  <h3 className={styles.modal__filterListItemTitle}>Sports</h3>
                  <div className={styles.modal__filterListItemWrapper}>
                    {uniqueCategories.slice(0, visibleCategories).map((categoryName: any) => (
                      <label key={categoryName} className={styles.modal__filterListItemLabel}>
                        <input type='checkbox' className={styles.modal__filterListItemInput} />
                        <div className={styles.modal__filterListItemCustomCheckbox}>
                          <CheckBoxSVG className={styles.modal__filterListItemCustomCheckboxImg} />
                        </div>
                        <span>{categoryName}</span>
                      </label>
                    ))}
                  </div>
                  {visibleCategories < uniqueCategories.length && (
                    <button
                      type='button'
                      className={styles.modal__filterBtn}
                      onClick={handleLoadMore}
                    >
                      Load more
                      <ArrowDownSVG />
                    </button>
                  )}
                </li>
                <li className={styles.modal__filterListItem}>
                  <h3 className={styles.modal__filterListItemTitle}>Roles</h3>
                  <div className={styles.modal__filterListItemWrapper}>
                    {filtersData.roles.map((item) => (
                      <label key={item.id} className={styles.modal__filterListItemLabel}>
                        <input type='checkbox' className={styles.modal__filterListItemInput} />
                        <div className={styles.modal__filterListItemCustomCheckbox}>
                          <CheckBoxSVG className={styles.modal__filterListItemCustomCheckboxImg} />
                        </div>
                        <span>{item.value}</span>
                      </label>
                    ))}
                  </div>
                  <button type='button' className={styles.modal__filterBtn}>
                    Load more
                    <ArrowDownSVG />
                  </button>
                </li>
                <li className={styles.modal__filterListItem}>
                  <h3 className={styles.modal__filterListItemTitle}>Advanced</h3>
                  <div className={styles.modal__filterListItemWrapper}>
                    {filtersData.advanced.map((item) => (
                      <label key={item.id} className={styles.modal__filterListItemLabel}>
                        <input type='checkbox' className={styles.modal__filterListItemInput} />
                        <div className={styles.modal__filterListItemCustomCheckbox}>
                          <CheckBoxSVG className={styles.modal__filterListItemCustomCheckboxImg} />
                        </div>
                        <span>{item.value}</span>
                      </label>
                    ))}
                  </div>
                </li>
              </ul>
            </form>
            <footer className={styles.modal__footer}>
              <div className={styles.modal__footerWrapper}>
                <button type='button' className={styles.modal__footerBtn}>
                  Clear filters
                </button>
                <button type='button' className={styles.modal__footerBtn}>
                  Show results
                </button>
              </div>
            </footer>
          </div>
        </ClassicModal>
      ) : null}
    </div>
  )
}

export default Filter

'use client'
import React, { Dispatch, SetStateAction, useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'

import styles from './Item.module.scss'

import { ProductPutData } from '@lib/api/Dashboard/RightsHolder/user/toolbox/models'

import Faq from '@assets/UserDashboard/toolbox/icons/faq.svg'
import GroupIcon from '@assets/UserDashboard/toolbox/icons/groupIcon.svg'
import SmallArrowRight from '@assets/UserDashboard/toolbox/icons/smallArrowRight.svg'
import noAvatar from '@assets/UserDashboard/toolbox/images/image6.jpg'

export type Child = {
  key: string
  iconURL: string | null
  name: string | null
}

type Props = {
  id: string
  updatedData: ProductPutData
  setUpdatedData: Dispatch<SetStateAction<ProductPutData>>
  duration?: string | null
  title?: string | null
  description?: string | null
  childs?: Child[] | null[]
  imageLink?: string | StaticImageData | null
}

const Item = ({
  id,
  updatedData,
  setUpdatedData,
  title,
  description,
  childs,
  imageLink
}: Props) => {
  const [slider, setSlider] = useState<any>(null)

  const handleNextSlide = () => {
    if (slider) {
      slider.slideNext()
    }
  }

  const handlePrevSlide = () => {
    if (slider) {
      slider.slidePrev()
    }
  }

  // Render the child links if available
  console.log('childs', childs)
  const childsArr = childs?.map(
    (child) =>
      child &&
      child.name && (
        <SwiperSlide key={child.key} className={styles.productItem__channelsOptionSlide}>
          <Link
            href={`/dashboard/user/toolbox/${child.key}`}
            className={`${styles.productItem__channelsOption} ${
              child.key === id ? styles.productItem__channelsOption_active : ''
            }`}
          >
            {child.iconURL ? (
              <img
                loading='lazy'
                alt={'Image'}
                className={styles.toolboxCard__groupWrapper}
                src={child.iconURL}
              />
            ) : (
              <GroupIcon />
            )}
            <span className={styles.productItem__channelsOptionSpan}>{child.name}</span>
          </Link>
        </SwiperSlide>
      )
  )
  return (
    <div className={styles.productItem}>
      <div className={styles.productItem__leftBlock}>
        {imageLink ? (
          <img
            loading='lazy'
            className={styles.productItem__leftBlockImg}
            src={typeof imageLink === 'string' ? imageLink : imageLink.toString()}
            alt={'Icon'}
          />
        ) : (
          <Image className={styles.productItem__leftBlockImg} src={noAvatar} alt={'Image'} />
        )}
        {childsArr && childsArr.length > 1 && (
          <div className={styles.productItem__channels}>
            <Swiper
              onSwiper={(swiper) => setSlider(swiper)}
              spaceBetween={24}
              freeMode={true}
              loop={false}
              direction={'horizontal'}
              draggable={true}
              slidesPerView={'auto'}
              className={styles.productItem__channelsSlider}
            >
              {childsArr}
            </Swiper>
            <div className={styles.productItem__channelsSliderLeftBlock}>
              <SmallArrowRight
                onClick={() => handlePrevSlide()}
                className={styles.productItem__channelsSliderLeft}
              />
            </div>
            <div className={styles.productItem__channelsSliderRightBlock}>
              <SmallArrowRight
                onClick={() => handleNextSlide()}
                className={styles.productItem__channelsSliderRight}
              />
            </div>
          </div>
        )}
      </div>
      <div className={styles.productItem__rightBlock}>
        <span className={styles.productItem__title}>{title}</span>
        <span className={styles.productItem__description}>{description}</span>
        <div className={styles.productItem__labelBlock}>
          <label className={styles.productItem__label} htmlFor='positionsPerMonth'>
            How many positions available per month?
          </label>
        </div>
        <input
          className={styles.productItem__inputText}
          type='text'
          name={'positionsPerMonth'}
          value={updatedData.product_available_count}
          onChange={(e) => {
            if (isNaN(Number(e.target.value))) {
              if (e.target.value !== '') return
            }
            if (Number(e.target.value) < 0) return
            setUpdatedData((prev) => {
              prev.product_available_count = Number(e.target.value)
              return { ...prev }
            })
          }}
        />
        <div className={styles.productItem__labelBlock}>
          <label className={styles.productItem__label} htmlFor='price'>
            Price
          </label>
          <Faq className={styles.productItem__labelFaqImg} />
        </div>
        <div className={styles.productItem__smallInputBlock}>
          <div className={styles.productItem__smallInputLeftText}>EUR</div>
          <input
            className={styles.productItem__smallInputText}
            type='text'
            name={'price'}
            value={updatedData.product_price}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                if (e.target.value !== '') return
              }
              if (Number(e.target.value) < 0) return
              setUpdatedData((prev) => {
                prev.product_price = Number(e.target.value)
                return { ...prev }
              })
            }}
          />
        </div>

        {/*{duration && (*/}
        {/*  <>*/}
        {/*    <div className={styles.productItem__labelBlock}>*/}
        {/*      <label className={styles.productItem__label} htmlFor='durations'>*/}
        {/*        Durations*/}
        {/*      </label>*/}
        {/*      <Faq className={styles.productItem__labelFaqImg} />*/}
        {/*    </div>*/}
        {/*    <div className={styles.productItem__smallInputBlock}>*/}
        {/*      <div className={styles.productItem__smallInputLeftText}>{duration}</div>*/}
        {/*      <input*/}
        {/*        className={styles.productItem__smallInputText}*/}
        {/*        type='text'*/}
        {/*        name={'durations'}*/}
        {/*        value={updatedData.product_duration !== null ? updatedData.product_duration : ''}*/}
        {/*        onChange={(e) => {*/}
        {/*          if (isNaN(Number(e.target.value))) {*/}
        {/*            if (e.target.value !== '') return*/}
        {/*          }*/}
        {/*          if (Number(e.target.value) < 0) return*/}
        {/*          setUpdatedData((prev) => {*/}
        {/*            prev.product_duration = Number(e.target.value)*/}
        {/*            return { ...prev }*/}
        {/*          })*/}
        {/*        }}*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*  </>*/}
        {/*)}*/}
      </div>
    </div>
  )
}

export default Item

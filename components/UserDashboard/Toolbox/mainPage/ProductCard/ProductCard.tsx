import React, { FC } from 'react'
import Image from 'next/image'

import styles from './ProductCard.module.scss'

import Available from '@assets/UserDashboard/toolbox/icons/available.svg'
import GroupIcon from '@assets/UserDashboard/toolbox/icons/groupIcon.svg'
import ItemCost from '@assets/UserDashboard/toolbox/icons/itemCost.svg'
import noAvatar from '@assets/UserDashboard/toolbox/images/image6.jpg'

type Props = {
  id: string
  name: string
  description: string
  groupName: string
  groupIcon: string | null
  price?: number
  count?: number
  available: boolean
  image: string
}
const ProductCard: FC<Props> = (props) => {
  return (
    <>
      <div
        className={`${styles.toolboxCard__soldOut} ${
          props.count !== undefined && props.count === 0 && styles.toolboxCard__soldOut_active
        }`}
      >
        <div className={styles.toolboxCard__soldOutTag}>Sold out</div>
        <span className={styles.toolboxCard__soldOutSpan}>Add new items</span>
      </div>
      <div className={styles.toolboxCard__sectionCartBlock}>
        <div className={styles.toolboxCard__sectionCartTop}>
          {/* Render the category image */}
          {props.image ? (
            <img
              loading='lazy'
              alt={'Image'}
              className={styles.toolboxCard__sectionCartImg}
              src={props.image}
              // src={
              //   typeof props.image === 'string'
              //     ? props.image
              //     : props.image.toString()
              // }
            />
          ) : (
            <Image src={noAvatar} className={styles.toolboxCard__sectionCartImg} alt={'Image'} />
          )}
        </div>
        <div className={styles.toolboxCard__sectionCartBottom}>
          <div>
            <div className={styles.toolboxCard__sectionCartTitle}>Collection name</div>
            <div className={styles.toolboxCard__sectionCartSubtitle}>{props.name}</div>
            {/*<div className={styles.toolboxCard__cardDescription}>{props.description}</div>*/}
            <div className={styles.toolboxCard__groupWrapper}>
              {/* Render the category icon */}
              {props.groupIcon ? (
                <img
                  loading='lazy'
                  alt={'Image'}
                  className={styles.toolboxCard__groupWrapper}
                  src={props.groupIcon}
                />
              ) : (
                <GroupIcon />
              )}
              <span className={styles.toolboxCard__groupName}>{props.groupName}</span>
            </div>
          </div>
          <div className={styles.toolboxCard__sectionCartInfo}>
            <div className={styles.toolboxCard__sectionCartInfoLeft}>
              {/* Render the price or item cost */}
              {props.price ? (
                <span className={styles.toolboxCard__sectionCartInfoTitle}>$ {props.price}</span>
              ) : (
                <ItemCost className={styles.toolboxCard__sectionCartInfoImg} />
              )}
              <span className={styles.toolboxCard__sectionCartInfoSubtitle}>Item cost</span>
            </div>
            <div className={styles.toolboxCard__sectionCartInfoLine}></div>
            <div className={styles.toolboxCard__sectionCartInfoRight}>
              {/* Render the available count or available icon */}
              {props.available || props.count === 0 ? (
                <span className={styles.toolboxCard__sectionCartInfoTitle}>{props.count}</span>
              ) : (
                <Available className={styles.toolboxCard__sectionCartInfoImg} />
              )}
              <span className={styles.toolboxCard__sectionCartInfoSubtitle}>Available</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductCard

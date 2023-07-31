import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

import styles from '@components/UserDashboard/Deals/BrandInvoices/BrandInvoices.module.scss'

import ArrowDown from '@assets/Icons/arrows/prev-down-arrow.svg'
import noAvatar from '@assets/UserDashboard/toolbox/images/image6.jpg'

type BrandItem = {
  name: string
  category: string
  status: string
  quantity: number
  budget: number
  icon: string
}

type Brand = {
  brandPK: string
  brandName: string
  brandImg: string
  items: BrandItem[]
}

type Props = {
  brand: Brand
}

const BrandInvoices: React.FC<Props> = ({ brand }) => {
  const [isOpen, setIsOpen] = useState(false)

  // Function to get the color name based on the status
  const getColorName = (status: string) => {
    const statusNames: { [key: string]: string } = {
      CANCELLED: 'Cancelled',
      PAYMENT_FAILED: 'Error',
      PAYMENT_COMPLETED: 'To do',
      DEAL_COMPLETED: 'Completed'
    }
    return statusNames[status] || styles.table__statusSpan_todo
  }

  // Function to get the color class name based on the status
  const getColorClassName = (status: string) => {
    const statusClassNames: { [key: string]: string } = {
      CANCELLED: styles.table__statusSpan_cancelled,
      PAYMENT_FAILED: styles.table__statusSpan_error,
      PAYMENT_COMPLETED: styles.table__statusSpan_todo,
      DEAL_COMPLETED: styles.table__statusSpan_completed
    }
    return statusClassNames[status] || styles.table__statusSpan_todo
  }

  // Filter the items based on certain statuses
  const filteredItems = brand.items.filter(
    (item) => item.status !== 'CANCELLED' && item.status !== 'PAYMENT_FAILED'
  )

  // Calculate the total quantity of filtered items
  const totalQuantity = filteredItems.reduce((total, item) => total + item.quantity, 0)

  // Calculate the total budget of filtered items and format it
  const totalBudget = filteredItems.reduce((total, item) => total + item.budget, 0).toFixed(2)

  // Toggle the open/close state of the items
  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={styles.table}>
      <div className={styles.brand}>
        <div className={styles.brand__left}>
          <div className={`${styles.table__bottonOption} ${styles.table__bottonChannels}`}>
            <div className={styles.table__logoBlock}>
              {/* Display the brand logo if available, otherwise display a default image */}
              {brand.brandImg ? (
                <img
                  loading='lazy'
                  className={styles.table__logo}
                  src={brand.brandImg}
                  alt={brand.brandName}
                />
              ) : (
                <Image className={styles.table__logo} src={noAvatar} alt={'noAvatar'} fill />
              )}
            </div>
            <span className={styles.table__titleSpan}>{brand.brandName}</span>
          </div>
        </div>
        <div className={styles.brand__right}>
          <div className={styles.table__statusSpanBlock}></div>
          <div className={styles.table__quantitySpanBlock}>
            {/* Display the total quantity of filtered items */}
            <span className={styles.table__quantitySpan}>{totalQuantity}</span>
          </div>
          <div className={styles.table__budgetSpanBlock}>
            {/* Display the total budget of filtered items */}
            <span className={styles.table__budgetSpan}>{totalBudget}€</span>
          </div>
          <div className={styles.table__viewItemsBlock}>
            <div className={styles.table__viewItems} onClick={toggleOpen}>
              <span className={styles.table__viewItemsSpan}>View Items</span>

              {/* Display an arrow icon with different styling based on whether the items are open or closed */}
              <ArrowDown
                className={
                  !isOpen
                    ? styles.table__viewItemsArrow
                    : `${styles.table__viewItemsArrow} ${styles.table__viewItemsArrow_active}`
                }
              />
            </div>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ display: 'none' }}
        animate={{ opacity: isOpen ? 1 : 0, display: isOpen ? 'flex' : 'none' }}
        className={styles.table__itemsBlock}
      >
        {/* Render the filtered brand items */}
        {filteredItems.map((item, index) => (
          <div key={index} className={styles.table__items}>
            <div className={styles.table__leftSub}>
              <div className={styles.table__itemsChannelsBlock}>
                <div className={styles.table__itemsImgBlock}>
                  {/* Display the item icon if available, otherwise display a default image */}
                  {item.icon && item.name ? (
                    <img
                      className={styles.table__itemsImg}
                      loading='lazy'
                      alt={item.name}
                      src={item.icon}
                    />
                  ) : (
                    <Image
                      className={styles.table__itemsImg}
                      src={noAvatar}
                      alt={'noAvatar'}
                      fill
                    />
                  )}
                </div>
                <div className={styles.table__itemsChannelsTextBlock}>
                  <span className={styles.table__itemsChannelsTitle}>{item.name}</span>
                  <span className={styles.table__itemsChannelsSubTitle}>{item.category}</span>
                </div>
              </div>
            </div>
            <div className={styles.table__rightSub}>
              <div className={styles.table__statusBlock}>
                {/* Display the status with appropriate color based on the status */}
                <div className={`${styles.table__statusSpan} ${getColorClassName(item.status)}`}>
                  {getColorName(item.status)}
                </div>
              </div>
              <div className={styles.table__itemsQuantityBlock}>
                <span className={styles.table__itemsQuantity}>{item.quantity}</span>
              </div>
              <div className={styles.table__itemsBudgetBlock}>
                <span className={styles.table__itemsBudget}>{item.budget}€</span>
              </div>
              <div className={styles.table__itemsViewDetailsBlock}>
                <span className={styles.table__itemsViewDetailsSpan}>View Details</span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default BrandInvoices

import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import styles from './CartConfiguration.module.scss'

import CartConfigurationPlatformGroup from './CartConfigurationPlatformGroup'

import ArrowDownSVG from '@assets/Icons/arrows/down-arrow-violet.svg'

const CartConfigurationInvoiceGroup = ({ invoiceGroup }: { invoiceGroup: any }) => {
  const [totalCount, setTotalCount] = useState<number>()
  const [totalSum, setTotalSum] = useState<number>()
  const [toggle, setToggle] = useState<boolean>(true)
  const isTablet = useMediaQuery({ maxWidth: 992 })

  const invoiceDetails = invoiceGroup[0]?.invoiceDetails

  const groupedPlatforms = invoiceGroup.reduce((group: any, item: any) => {
    group[item?.platformId] = group[item?.platformId] ?? []
    group[item?.platformId].push(item)
    return group
  }, {})

  useEffect(() => {
    let tCount = 0
    let tSum = 0
    invoiceGroup?.forEach((item: any) => {
      tCount += item?.invoiceItemModel?.invoice_item_quantity
      tSum += item?.price * item?.invoiceItemModel?.invoice_item_quantity
    })
    setTotalCount(tCount)
    // @ts-ignore
    setTotalSum(Number(tSum).toFixed(2))
  }, [invoiceGroup])

  return (
    <div className={`${styles.configuration__item} ${toggle && styles.configuration__itemActive}`}>
      <div className={styles.configuration__itemHeader}>
        <div className={styles.configuration__userWrapper}>
          <img
            src={invoiceDetails?.imgLink}
            className={styles.configuration__avatar}
            alt={`${invoiceDetails?.firstName} ${invoiceDetails?.lastName}`}
          />
          <div className={styles.configuration__userInfo}>
            <h4
              className={styles.configuration__userInfoTitle}
            >{`${invoiceDetails?.firstName} ${invoiceDetails?.lastName}`}</h4>
            <span className={styles.configuration__userInfoSubtitle}>{invoiceDetails?.title}</span>
          </div>
        </div>
        <div className={styles.configuration__totals}>
          <div className={styles.configuration__totalWrapper}>
            <div className={styles.configuration__priceWrapper}>
              <span className={styles.configuration__priceWrapperCount}>{totalCount}</span>
              <span className={styles.configuration__priceWrapperTitle}>Items</span>
            </div>
            <div className={styles.configuration__priceWrapper}>
              <span className={styles.configuration__priceWrapperCount}>{totalSum}</span>
              <span className={styles.configuration__priceWrapperTitle}>Total Price</span>
            </div>
          </div>
          <button
            className={`${styles.configuration__dropdownBtn} ${
              toggle && styles.configuration__dropdownBtnActive
            }`}
            onClick={() => setToggle((prev) => !prev)}
          >
            {isTablet ? null : <span>View all</span>}
            {toggle ? (
              <ArrowDownSVG />
            ) : (
              <ArrowDownSVG className={styles.configuration__dropdownBtnRotate} />
            )}
          </button>
        </div>
      </div>
      <div
        className={
          toggle ? styles.configuration__itemContentActive : styles.configuration__itemContent
        }
      >
        <div className={styles.configuration__board}>
          <h4>Items</h4>
          <div className={styles.configuration__boardTotal}>
            <span>Total Price</span>
            <span>Price</span>
            <span>#</span>
          </div>
        </div>
        {Object.keys(groupedPlatforms).map((key: any) => (
          <CartConfigurationPlatformGroup key={key} platformGroup={groupedPlatforms[key]} />
        ))}
      </div>
    </div>
  )
}

export default CartConfigurationInvoiceGroup

import { ReactNode, useState } from 'react'
import { motion } from 'framer-motion'

import styles from './MultiPicker.module.scss'

import Arrow from '@assets/BrandDashBoard/profileBrands/icons/arrow.svg'
import DeleteLocation from '@assets/BrandDashBoard/profileBrands/icons/deleteLocation.svg'
import Close from '@assets/UserDashboard/profile/icons/close.svg'
import Tick from '@assets/UserDashboard/profile/icons/tick.svg'

type Props<T> = {
  id: string
  items: T[]
  checkedItems: T[]
  setCheckedItems: (el: T, type: 'add' | 'remove') => void
  placeholder?: string
}

const MultiPicker = <T extends ReactNode>({
  id,
  items,
  checkedItems,
  setCheckedItems,
  placeholder
}: Props<T>) => {
  const [open, setIsOpen] = useState(false)
  return (
    <>
      <div className={styles.organisation__locationInputBlock} onClick={() => setIsOpen(!open)}>
        <div className={styles.organisation__locationInput} id={id}>
          {placeholder ? placeholder : ''}
        </div>
        <motion.div
          initial={false}
          animate={open ? 'open' : 'closed'}
          variants={{
            open: { rotate: '180deg' },
            closed: { rotate: '0deg' }
          }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <Arrow />
        </motion.div>
      </div>
      <motion.div
        initial={false}
        animate={open ? 'open' : 'closed'}
        variants={{
          open: { opacity: 1, display: 'unset' },
          closed: { opacity: 0, display: 'none' }
        }}
        className={styles.organisation__countyBlockToOpen}
      >
        <div className={styles.organisation__countyToOpenTop}>
          <span className={styles.organisation__countyToOpenSpan}>Selection</span>
          <Close
            className={styles.organisation__countyToOpenClose}
            onClick={() => setIsOpen(!open)}
          />
        </div>
        <div className={styles.organisation__countyToOpenBottom}>
          {items.map((el, i) => {
            if (checkedItems.includes(el)) {
              return (
                <div
                  className={styles.organisation__countyToOpenElement_Selected}
                  key={i}
                  onClick={() => {
                    setCheckedItems(el, 'remove')
                    setIsOpen(!open)
                  }}
                >
                  <div className={styles.organisation__countyToOpenLeft}>
                    <span className={styles.organisation__countyToOpenCounty}>{el}</span>
                  </div>
                  <Tick className={styles.organisation__countyToOpenTick} />
                </div>
              )
            }
            return (
              <div
                className={styles.organisation__countyToOpenElement}
                key={i}
                onClick={() => {
                  setCheckedItems(el, 'add')
                  setIsOpen(!open)
                }}
              >
                <div className={styles.organisation__countyToOpenLeft}>
                  <span className={styles.organisation__countyToOpenCounty}>{el}</span>
                </div>
                <Tick className={styles.organisation__countyToOpenTick} />
              </div>
            )
          })}
        </div>
      </motion.div>
      <div className={styles.organisation__locations}>
        {checkedItems.map((country, i) => (
          <div key={i} className={styles.organisation__locationBlock}>
            <div className={styles.organisation__locationSpanBlock}>
              <span className={styles.organisation__locationSpan}>{country}</span>
            </div>
            <div
              className={styles.organisation__locationImgBlock}
              onClick={() => {
                setCheckedItems(country, 'remove')
              }}
            >
              <DeleteLocation className={styles.organisation__locationImg} />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default MultiPicker

import { ReactNode, useState } from 'react'
import { motion } from 'framer-motion'

import styles from './DropdownPicker.module.scss'

import Arrow from '@assets/BrandDashBoard/profileBrands/icons/arrow.svg'
import Close from '@assets/UserDashboard/profile/icons/close.svg'
import Tick from '@assets/UserDashboard/profile/icons/tick.svg'

type Props<T> = {
  id: string
  items: T[]
  checked: T
  setChecked: (el: T) => void
  className?: string
}

const DropdownPicker = <T extends ReactNode>({
  id,
  items,
  checked,
  setChecked,
  className
}: Props<T>) => {
  const [open, setIsOpen] = useState(false)
  return (
    <>
      <div
        className={`${styles.organisation__sectorBlock} ${className}}`}
        id={id}
        onClick={() => setIsOpen(!open)}
      >
        <span className={styles.organisation__sectorSpan}>{checked}</span>

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
            alignItems: 'center'
          }}
        >
          <Arrow />
        </motion.div>

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
            {/*@ts-ignore*/}
            {items.map((el, i) => {
              if (el === checked) {
                return (
                  <div
                    className={styles.organisation__countyToOpenElement_Selected}
                    key={i}
                    onClick={() => {
                      setChecked(el)
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
                    setChecked(el)
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
      </div>
    </>
  )
}

export default DropdownPicker

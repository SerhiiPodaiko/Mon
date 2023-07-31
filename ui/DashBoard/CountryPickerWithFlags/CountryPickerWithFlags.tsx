import { Dispatch, FC, SetStateAction } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

import styles from './CountryPickerWithFlags.module.scss'

import { Language } from '@lib/api/Dashboard/RightsHolder/user/profile/models'

import ArrowDown from '@assets/UserDashboard/profile/icons/arrowDown.svg'
import Close from '@assets/UserDashboard/profile/icons/close.svg'
import Tick from '@assets/UserDashboard/profile/icons/tick.svg'

type Props = {
  countries: Language[]
  checked: Language
  setChecked: (country: Language) => void
  open: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}
const CountryPickerWithFlags: FC<Props> = ({ countries, checked, setChecked, open, setIsOpen }) => {
  return (
    <div className={styles.dropDownWrapper}>
      <div className={styles.checker} onClick={() => setIsOpen(!open)}>
        <div className={styles.info}>
          {checked && (
            <Image
              src={`/countries/${checked.country_code}.svg`}
              alt={checked.country_code}
              width={26}
              height={17}
              loading={'eager'}
              className={styles.flag}
            />
          )}
          <span>{checked.name}</span>
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
            alignItems: 'center'
          }}
        >
          <ArrowDown />
        </motion.div>
      </div>
      <motion.div
        initial={false}
        animate={open ? 'open' : 'closed'}
        variants={{
          open: { opacity: 1, display: 'unset' },
          closed: { opacity: 0, display: 'none' }
        }}
        className={styles.dropDown}
      >
        <div className={styles.dropDown__toOpenTop}>
          <span className={styles.dropDown__toOpenSpan}>Language selection</span>
          <Close className={styles.dropDown__toOpenClose} onClick={() => setIsOpen(!open)} />
        </div>
        <div className={styles.dropDown__toOpenBottom}>
          {/*@ts-ignore*/}
          {checked &&
            countries &&
            countries
              //@ts-ignore
              .filter((el) => el.name !== checked.name)
              .map((el, i) => (
                <div
                  className={styles.dropDown__countyToOpenElement}
                  key={i}
                  onClick={() => {
                    setChecked(el)
                  }}
                >
                  <div className={styles.dropDown__countyToOpenLeft}>
                    <Image
                      src={`/countries/${el.country_code}.svg`}
                      alt={el.country_code}
                      width={26}
                      height={17}
                      loading={'eager'}
                      className={styles.flag}
                    />
                    <span className={styles.dropDown__countyToOpenCounty}>{el.name}</span>
                  </div>
                  <Tick className={styles.dropDown__countyToOpenTick} />
                </div>
              ))}
        </div>
      </motion.div>
    </div>
  )
}

export default CountryPickerWithFlags

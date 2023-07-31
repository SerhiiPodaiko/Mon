import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useQuery } from 'react-query'

import styles from './PhoneDown.module.scss'

import { getCountries } from '@lib/api/Countries/getCountries'
import { Countries } from '@lib/api/Countries/models'

import ArrowDown from '@assets/UserDashboard/profile/icons/arrowDown.svg'
import Close from '@assets/UserDashboard/profile/icons/close.svg'
import Tick from '@assets/UserDashboard/profile/icons/tick.svg'

type Props = {
  phone: string
  phone_code: string | null | undefined
  setPhone: (phone: string, code: string) => void
}

type Country = {
  name: string
  img: any
  phone: string
  code: string
  regExp: string
}
// Component
const PhoneDown = ({ phone, phone_code, setPhone }: Props) => {
  const [open, setIsOpen] = useState(false)
  const [validatorErr, setValidatorErr] = useState(false)

  const { data: allCountries, isLoading } = useQuery<Countries>(
    'allCountries',
    () => getCountries(),
    {
      staleTime: Infinity
    }
  )

  const [country, setCountry] = useState<Country>({
    code: '',
    img: undefined,
    phone: '',
    regExp: '',
    name: ''
  })

  const countries = allCountries?.map((country) => {
    if (country.country_code === phone_code) {
      return {
        name: country.country_name,
        img: (
          <Image
            src={`/countries/${country.country_code}.svg`}
            alt={country.country_code}
            width={26}
            height={17}
            loading={'eager'}
            className={styles.personalInformation__flag}
          />
        ),
        phone: `${phone}`,
        code: country.country_code,
        regExp: `^\\+${country.country_code}\\d{9}$`
      }
    }
    return {
      name: country.country_name,
      img: (
        <Image
          src={`/countries/${country.country_code}.svg`}
          alt={country.country_code}
          width={26}
          height={17}
          className={styles.personalInformation__flag}
        />
      ),
      phone: `+${country.country_dialing_code}`,
      code: country.country_code,
      regExp: `^\\+${country.country_dialing_code}\\d{9}$`
    }
  })

  useEffect(() => {
    if (allCountries && !isLoading && countries) {
      console.log(`Код телефона - ${phone_code}`)
      const checkedCountry = countries.find((el) => el.code === phone_code)
      if (checkedCountry) {
        setCountry(checkedCountry)
        console.log(countries)
        console.log(country)
      } else {
        const estonia = countries.find((el) => el.code === 'EE') as Country
        setCountry(estonia)
      }
    }
  }, [phone, phone_code, allCountries])

  const validator = (value: string) => {
    if (country) {
      setValidatorErr(false)

      console.log(country)
      setCountry((prev) => ({
        ...prev,
        phone: value
      }))
      setPhone(value, country.code)
    }
  }

  const handleSetCountry = (country: Country) => {
    setCountry(country)
    setIsOpen(!open)
    setPhone(country.phone, country.code)
  }

  if (!allCountries || isLoading) {
    return null
  }

  return (
    <>
      <div className={styles.personalInformation__countyBlock} onClick={() => setIsOpen(!open)}>
        {country && country.img}
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
          <ArrowDown className={styles.personalInformation__arrow} />
        </motion.div>
      </div>
      <motion.div
        initial={false}
        animate={open ? 'open' : 'closed'}
        variants={{
          open: { opacity: 1, display: 'unset' },
          closed: { opacity: 0, display: 'none' }
        }}
        className={styles.personalInformation__countyBlockToOpen}
      >
        <div className={styles.personalInformation__countyToOpenTop}>
          <span className={styles.personalInformation__countyToOpenSpan}>Country selection</span>
          <Close
            className={styles.personalInformation__countyToOpenClose}
            onClick={() => setIsOpen(!open)}
          />
        </div>
        <div className={styles.personalInformation__countyToOpenBottom}>
          {/*@ts-ignore*/}
          {country &&
            countries &&
            countries
              //@ts-ignore
              .filter((el) => el.name !== country.name)
              .map((el, i) => (
                <div
                  className={styles.personalInformation__countyToOpenElement}
                  key={i}
                  onClick={() => {
                    handleSetCountry(el)
                  }}
                >
                  <div className={styles.personalInformation__countyToOpenLeft}>
                    {el.img}
                    <span className={styles.personalInformation__countyToOpenCounty}>
                      {el.name}
                    </span>
                  </div>
                  <Tick className={styles.personalInformation__countyToOpenTick} />
                </div>
              ))}
        </div>
      </motion.div>
      <input
        className={styles.personalInformation__phoneNumber}
        style={validatorErr ? { borderColor: 'red' } : { borderColor: 'rgba(196, 196, 196, 0.5)' }}
        id='phoneNumber'
        type='text'
        // @ts-ignore
        value={country.phone}
        onChange={(e) => validator(e.target.value)}
      />
    </>
  )
}

export default PhoneDown

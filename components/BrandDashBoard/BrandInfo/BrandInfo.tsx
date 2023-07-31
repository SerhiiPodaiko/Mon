'use client'
import { Dispatch, SetStateAction } from 'react'

import styles from './BrandInfo.module.scss'

import { BrandProfile } from '@lib/api/Dashboard/brand/models'

import PhoneDown from '@ui/DashBoard/PhoneDown/PhoneDown'

type Props = {
  brandData: BrandProfile
  setBrandData: Dispatch<SetStateAction<BrandProfile>>
}

const Info = ({ brandData, setBrandData }: Props) => {
  return (
    <div className={styles.personalInformation} id={'personalInformation'}>
      {/* Title */}
      <span className={styles.personalInformation__title}>Personal Information</span>
      <div className={styles.personalInformation__form}>
        {/* First Name */}
        <div
          className={`${styles.personalInformation__option} ${styles.personalInformation__firstNameBlock}`}
        >
          <label className={styles.personalInformation__label} htmlFor='firstName'>
            First Name
          </label>
          <input
            className={`${styles.personalInformation__whiteInput} ${styles.personalInformation__input}`}
            id='firstName'
            type='text'
            value={brandData.first_name}
            onChange={(e) =>
              setBrandData((s) => ({
                ...s,
                first_name: e.target.value
              }))
            }
          />
        </div>
        {/* Last Name */}
        <div
          className={`${styles.personalInformation__option} ${styles.personalInformation__lastNameBlock}`}
        >
          <label className={styles.personalInformation__label} htmlFor='lastName'>
            Last Name
          </label>
          <input
            className={`${styles.personalInformation__whiteInput} ${styles.personalInformation__input}`}
            id='lastName'
            type='text'
            value={brandData.last_name}
            onChange={(e) =>
              setBrandData((s) => ({
                ...s,
                last_name: e.target.value
              }))
            }
          />
        </div>
        {/* Role */}
        <div
          className={`${styles.personalInformation__option} ${styles.personalInformation__roleBlock}`}
        >
          <label className={styles.personalInformation__label} htmlFor='role'>
            Role
          </label>
          <input
            className={`${styles.personalInformation__greyInput} ${styles.personalInformation__input}`}
            id='role'
            type='text'
            defaultValue={brandData.role}
            disabled={true}
          />
        </div>
        {/* Date of Birth */}
        <div
          className={`${styles.personalInformation__option} ${styles.personalInformation__datepickerBlock}`}
        >
          <label className={styles.personalInformation__label} htmlFor='datepicker'>
            Date of Birth
          </label>
          <div>
            <input
              id='datepicker'
              className={`${styles.personalInformation__datepicker} ${styles.personalInformation__input}`}
              type='date'
              value={brandData.date_of_birth}
              onChange={(e) =>
                setBrandData((s) => ({
                  ...s,
                  date_of_birth: e.target.value
                }))
              }
            />
          </div>
        </div>
        {/* Email Address */}
        <div
          className={`${styles.personalInformation__option} ${styles.personalInformation__emailBlock}`}
        >
          <label className={styles.personalInformation__label} htmlFor='email'>
            Email Address
          </label>
          <input
            className={`${styles.personalInformation__greyInput} ${styles.personalInformation__input}`}
            id='email'
            type='text'
            defaultValue={brandData.email}
            disabled={true}
          />
        </div>
        {/* Phone Number */}
        <div
          className={`${styles.personalInformation__option} ${styles.personalInformation__phoneNumberBigBlock}`}
        >
          <label className={styles.personalInformation__label} htmlFor='phoneNumber'>
            Phone Number
          </label>
          <div className={styles.personalInformation__phoneNumberBlock}>
            <PhoneDown
              phone={brandData.phone_number}
              phone_code={brandData.phone_code}
              setPhone={(phone: string, code: string) => {
                setBrandData((prevState) => {
                  prevState.phone_number = phone
                  prevState.phone_code = code
                  return { ...prevState }
                })
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Info

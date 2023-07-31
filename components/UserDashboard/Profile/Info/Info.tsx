'use client'
import { Dispatch, SetStateAction } from 'react'
import { getCookie } from 'cookies-next'
import { useQuery } from 'react-query'

import styles from './Info.module.scss'

import { getCountries } from '@lib/api/Countries/getCountries'
import { Countries } from '@lib/api/Countries/models'
import { uploadPhoto } from '@lib/api/Dashboard/RightsHolder/uploadPhoto'
import { getLanguages } from '@lib/api/Dashboard/RightsHolder/user/profile/getLanguages'
import { Language, Sportsman } from '@lib/api/Dashboard/RightsHolder/user/profile/models'

import DropdownPicker from '@ui/DashBoard/DropdownPicker/DropdownPicker'
import MultiPicker from '@ui/DashBoard/MultiPicker/MultiPicker'
import PhoneDown from '@ui/DashBoard/PhoneDown/PhoneDown'

import CameraIcon from '@assets/UserDashboard/profile/icons/camera.svg'

type Props = {
  userData: Sportsman
  setUserData: Dispatch<SetStateAction<Sportsman>>
}

const Info = ({ userData, setUserData }: Props) => {
  // Fetch all countries using a query
  const { data: allCountries } = useQuery<Countries>('brandAllCountries', () => getCountries(), {
    staleTime: Infinity
  })
  // Fetch all languages using a query
  const { data: allLanguages } = useQuery<Language[]>('languages', () => getLanguages(), {
    staleTime: Infinity
  })
  // Get the role from the cookie
  const role = getCookie('Role')

  return (
    <div className={styles.personalInformation} id={'personalInformation'}>
      <span className={styles.personalInformation__title}>Personal Information</span>
      <div className={styles.personalInformation__form}>
        {/* Upload banner */}
        <label htmlFor='uploadBanner' className={styles.personalInformation__formBannerBlock}>
          <div
            className={`${styles.personalInformation__formBanner} ${
              userData.background_link === null
                ? ''
                : styles.personalInformation__formBanner_withImg
            }`}
          >
            {userData.background_link === null ? (
              <>
                <CameraIcon className={styles.personalInformation__formBannerIcon} />
                <span className={styles.personalInformation__formBannerSpan}>
                  Click to change background photo
                </span>
              </>
            ) : (
              <img
                loading='lazy'
                className={styles.personalInformation__formBannerImg}
                src={userData.background_link}
                alt='backgroundImage'
              />
            )}
          </div>
          <input
            type='file'
            name='uploadBanner'
            id='uploadBanner'
            style={{ display: 'none' }}
            onChange={(event) => {
              if (event.target.files && event.target.files[0]) {
                // Upload the selected photo
                uploadPhoto(event.target.files[0]).then((res) => {
                  if (res.link) {
                    // Update the user data with the uploaded photo
                    setUserData((prevState) => ({
                      ...prevState,
                      background_link: res.link,
                      background_file_name: res.filename
                    }))
                  }
                })
              }
            }}
          />
          <span className={styles.personalInformation__formBannerUnderSpan}>
            Maximum image size is 1.5 Mb
          </span>
        </label>
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
            value={userData.first_name}
            onChange={(e) =>
              setUserData((s) => ({
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
            value={userData.last_name}
            onChange={(e) =>
              setUserData((s) => ({
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
            // @ts-ignore
            defaultValue={role ? role : ''}
            disabled={true}
          />
        </div>
        {/* Discipline */}
        <div
          className={`${styles.personalInformation__option} ${styles.personalInformation__disciplineBlock}`}
        >
          <label className={styles.personalInformation__label} htmlFor='discipline'>
            Discipline
          </label>
          <input
            className={`${styles.personalInformation__greyInput} ${styles.personalInformation__input}`}
            id='discipline'
            type='text'
            defaultValue={userData.kind_of_sport.name}
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
              value={userData.date_of_birth !== null ? userData.date_of_birth : ''}
              onChange={(e) =>
                setUserData((s) => ({
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
            defaultValue={userData.email}
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
              phone={userData.phone_number}
              phone_code={userData.phone_code}
              setPhone={(phone: string, code: string) => {
                setUserData((prevState) => ({
                  ...prevState,
                  phone_number: phone,
                  phone_code: code
                }))
              }}
            />
          </div>
        </div>
        {/* Gender */}
        <div
          className={`${styles.personalInformation__option} ${styles.personalInformation__genderBlock}`}
        >
          <label className={styles.personalInformation__label} htmlFor='gender'>
            Gender
          </label>
          <DropdownPicker<string>
            id={'gender'}
            items={['Male', 'Female', 'Other']}
            checked={userData.gender === null ? '' : userData.gender}
            setChecked={(el) => {
              setUserData((prevState) => ({
                ...prevState,
                gender: el
              }))
            }}
          />
        </div>
        {/* Languages */}
        <div
          className={`${styles.personalInformation__option} ${styles.personalInformation__languagesBlock}`}
        >
          <label className={styles.personalInformation__label} htmlFor='language'>
            Languages*
          </label>
          <MultiPicker<string>
            id='language'
            items={allLanguages ? allLanguages.map((lang) => lang.name) : []}
            checkedItems={
              userData.languages === null ? [] : userData.languages.map((lang) => lang.name)
            }
            placeholder='Choose languages'
            setCheckedItems={(el, type) => {
              if (type === 'add') {
                if (userData.languages !== null) {
                  setUserData((prev) => ({
                    ...prev,
                    // @ts-ignore
                    languages: [...prev.languages, { name: el }]
                  }))
                } else {
                  // @ts-ignore
                  setUserData((prev) => ({
                    ...prev,
                    languages: [{ name: el }]
                  }))
                }
              }
              if (type === 'remove') {
                setUserData((prev) => ({
                  ...prev,
                  // @ts-ignore
                  languages: [...prev.languages.filter((c) => c.name !== el)]
                }))
              }
            }}
          />
        </div>
        {/* Location */}
        <div
          className={`${styles.personalInformation__option} ${styles.personalInformation__locationBlock}`}
        >
          <label className={styles.personalInformation__label} htmlFor='location'>
            Location*
          </label>
          <DropdownPicker<string>
            id={'location'}
            items={allCountries ? allCountries.map((country) => country.country_name) : []}
            checked={userData.country_name}
            setChecked={(el) => {
              setUserData((prevState) => ({
                ...prevState,
                country_name: el
              }))
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Info

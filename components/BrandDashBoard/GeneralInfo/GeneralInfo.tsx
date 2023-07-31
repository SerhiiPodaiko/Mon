'use client'
import React, { Dispatch, SetStateAction } from 'react'
import { useQuery } from 'react-query'

import styles from './GeneralInfo.module.scss'

import { getCountries } from '@lib/api/Countries/getCountries'
import { Countries } from '@lib/api/Countries/models'
import { BrandData, BrandSectors } from '@lib/api/Dashboard/brand/models'
import { uploadPhoto } from '@lib/api/Dashboard/brand/uploadPhoto'
import { getSectors } from '@lib/api/Dashboard/brand/user/profile/getSectors'

import DropdownPicker from '@ui/DashBoard/DropdownPicker/DropdownPicker'
import MultiPicker from '@ui/DashBoard/MultiPicker/MultiPicker'
import PhoneDown from '@ui/DashBoard/PhoneDown/PhoneDown'

import noBackground from '@assets/BrandDashBoard/brandNoBg.png'
import AddAvatarIcon from '@assets/BrandDashBoard/profileBrands/icons/addAvatarIcon.svg'
import CameraIcon from '@assets/UserDashboard/profile/icons/camera.svg'
import noAvatar from '@assets/UserDashboard/profile/images/avatar_no.png'

type Props = {
  brandData: BrandData
  setBrandData: Dispatch<SetStateAction<BrandData>>
}

// Component
const GeneralInfo = ({ brandData, setBrandData }: Props) => {
  // Fetch all countries data
  const { data: allCountries } = useQuery<Countries>('brandAllCountries', () => getCountries(), {
    staleTime: Infinity
  })
  // Fetch all sectors data
  const { data: allSectors } = useQuery<BrandSectors>('brandAllSectors', () => getSectors(), {
    staleTime: Infinity
  })

  return (
    <div className={styles.organisation} id={'generalInformation'}>
      <span className={styles.organisation__title}>General Information</span>
      <div className={styles.organisation__block}>
        <div className={styles.organisation__banner}>
          <label
            className={styles.organisation__bannerLabel}
            htmlFor='uploadBrandBanner'
            style={{ cursor: 'pointer' }}
          >
            <div
              className={
                brandData.brand.background_link === null
                  ? styles.organisation__formBanner
                  : `${styles.organisation__formBanner} ${styles.organisation__formBanner_withImg}`
              }
            >
              {brandData.brand.background_link === null ? (
                // Add background photo icon and message
                <>
                  <CameraIcon className={styles.organisation__formBannerIcon} />
                  <span className={styles.organisation__formBannerSpan}>
                    Click to change background photo
                  </span>
                </>
              ) : (
                // Display background photo
                <img
                  loading='lazy'
                  alt='Banner'
                  className={styles.organisation__bannerImg}
                  //@ts-ignore
                  src={
                    brandData.brand.background_link ? brandData.brand.background_link : noBackground
                  }
                  onError={() => {
                    setBrandData((prevState) => {
                      prevState.brand.background_link = noBackground.src
                      return {
                        ...prevState
                      }
                    })
                  }}
                />
              )}
            </div>
          </label>
          <input
            type='file'
            name='uploadBrandBanner'
            id='uploadBrandBanner'
            style={{ display: 'none' }}
            onChange={(event) => {
              if (event.target.files && event.target.files[0]) {
                // Upload background photo
                uploadPhoto(event.target.files[0]).then((res) => {
                  if (res.link) {
                    setBrandData((prevState) => {
                      // Update brand data with new background photo information
                      prevState.brand.background_link = res.link
                      prevState.brand.background_file_name = res.filename
                      return { ...prevState }
                    })
                  }
                })
              }
            }}
          />
          <div className={styles.organisation__bannerAvatarBlock}>
            <img
              loading='lazy'
              alt='Avatar'
              className={styles.organisation__bannerAvatar}
              //@ts-ignore
              src={brandData.brand.logo_link ? brandData.brand.logo_link : noAvatar}
              onError={() => {
                setBrandData((prevState) => {
                  prevState.brand.logo_link = noAvatar.src
                  return {
                    ...prevState
                  }
                })
              }}
            />
            <div className={styles.organisation__bannerAvatarAddBlock}>
              <label htmlFor='uploadBrandPhoto' style={{ cursor: 'pointer' }}>
                <AddAvatarIcon className={styles.infoBlock__imgIcon} />
              </label>
              <input
                type='file'
                name='file'
                id='uploadBrandPhoto'
                style={{ display: 'none' }}
                onChange={(event) => {
                  if (event.target.files && event.target.files[0]) {
                    // Upload avatar photo
                    uploadPhoto(event.target.files[0]).then((res) => {
                      if (res.link) {
                        setBrandData((prevState) => {
                          // Update brand data with new avatar photo information
                          prevState.brand.logo_link = res.link
                          prevState.brand.logo_file_name = res.filename
                          return { ...prevState }
                        })
                      }
                    })
                  }
                }}
              />
            </div>
          </div>
        </div>
        <span className={styles.organisation__bannerSubTitle}>Maximum image size is 200 kB.</span>
        <span className={styles.organisation__formTitle}>Organization Information</span>
        <div className={styles.organisation__form}>
          <div className={styles.organisation__element}>
            <label className={styles.organisation__label} htmlFor='officialName'>
              Official name
            </label>
            <input
              value={brandData.brand.official_name}
              onChange={(e) =>
                setBrandData((s) => {
                  s.brand.official_name = e.target.value
                  return { ...s }
                })
              }
              className={styles.organisation__input}
              id='officialName'
              type='text'
            />
          </div>
          <div className={styles.organisation__element}>
            <label className={styles.organisation__label} htmlFor='sector'>
              Sector
            </label>
            <DropdownPicker<string>
              id={'sector'}
              items={allSectors ? allSectors.map((sec) => sec) : []}
              checked={brandData.brand.sector}
              setChecked={(el) => {
                setBrandData((state) => {
                  state.brand.sector = el
                  return { ...state }
                })
              }}
            />
          </div>
          <div className={styles.organisation__element}>
            <label className={styles.organisation__label} htmlFor='website'>
              Website
            </label>
            <input
              value={brandData.brand.website}
              disabled
              className={styles.organisation__input}
              id='website'
              type='text'
            />
          </div>
          <div className={styles.organisation__element}>
            <label className={styles.organisation__label} htmlFor='phoneNumber1'>
              Phone Number
            </label>
            <div className={styles.organisation__phoneNumberBlock}>
              <PhoneDown
                phone={brandData.brand.phone_number}
                phone_code={brandData.brand.phone_code}
                setPhone={(phone: string, code: string) => {
                  setBrandData((prevState) => {
                    prevState.brand.phone_number = phone
                    prevState.brand.phone_code = code
                    return { ...prevState }
                  })
                }}
              />
            </div>
          </div>
          <div className={styles.organisation__element}>
            <label className={styles.organisation__label} htmlFor='email1'>
              Email Address
            </label>
            <input
              defaultValue={brandData.brand.email}
              disabled={true}
              className={`${styles.organisation__greyInput} ${styles.organisation__input}`}
              id='email1'
              type='text'
            />
          </div>
        </div>
        <span className={styles.organisation__locationTitle}>Location</span>
        <div className={styles.organisation__locationBlock}>
          <label className={styles.organisation__locationLabel} htmlFor='locations'>
            Where are you operating?
          </label>
          <MultiPicker<string>
            id='locations'
            items={allCountries ? allCountries.map((country) => country.country_name) : []}
            checkedItems={brandData.countries}
            placeholder='Choose locations'
            setCheckedItems={(el, type) => {
              if (type === 'add') {
                setBrandData((prev) => ({
                  ...prev,
                  countries: [...prev.countries, el]
                }))
              }
              if (type === 'remove') {
                setBrandData((prev) => ({
                  ...prev,
                  countries: [...prev.countries.filter((c) => c !== el)]
                }))
              }
            }}
          />
          <label className={styles.organisation__locationSecondLabel} htmlFor='description'>
            Short description about the company
          </label>
          <textarea
            value={brandData.brand.description}
            onChange={(e) =>
              setBrandData((s) => {
                s.brand.description = e.target.value
                return { ...s }
              })
            }
            className={styles.organisation__textarea}
            id='description'
            name=''
          ></textarea>
          <span className={styles.organisation__symbols}>
            {brandData.brand.description === null ? 0 : brandData.brand.description.length}
          </span>
        </div>
      </div>
    </div>
  )
}

export default GeneralInfo

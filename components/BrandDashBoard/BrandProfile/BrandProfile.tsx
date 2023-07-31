'use client'
import React, { useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'

import styles from '@components/BrandDashBoard/BrandProfile/BrandProfile.module.scss'

import { BrandInfo, GeneralInfo } from '@components/BrandDashBoard'
import MediaChannels from '@components/UserDashboard/Profile/MediaChannels/MediaChannels'

import { BrandData, BrandProfile } from '@lib/api/Dashboard/brand/models'
import { uploadPhoto } from '@lib/api/Dashboard/brand/uploadPhoto'
import { getBrandData } from '@lib/api/Dashboard/brand/user/profile/getBrandData'
import { getBrandUser } from '@lib/api/Dashboard/brand/user/profile/getBrandUser'
import { getMedia } from '@lib/api/Dashboard/brand/user/profile/getMedia'
import { postMediaChannels } from '@lib/api/Dashboard/brand/user/profile/postMediaChannels'
import { putBrandData } from '@lib/api/Dashboard/brand/user/profile/putBrandData'
import { putBrandProfile } from '@lib/api/Dashboard/brand/user/profile/putBrandProfile'
import { MediaChannel } from '@lib/api/Dashboard/models'

import useBrandData from '@hooks/Dashboard/Brand/useBrandData'
import useBrandProfile from '@hooks/Dashboard/Brand/useBrandProfile'
import useMediaData from '@hooks/Dashboard/RightsHolder/user/useMediaData'

import InfoHashLink from '@ui/DashBoard/InfoHashLink/InfoHashLink'
import Preloader from '@ui/Preloader/Preloader'

import AddAvatarIcon from '@assets/UserDashboard/profile/icons/addAvatarIcon.svg'
import MediaChannelsIcon from '@assets/UserDashboard/profile/icons/mediaChannels.svg'
import PersonalInformation from '@assets/UserDashboard/profile/icons/personalInformation.svg'
import Results from '@assets/UserDashboard/profile/icons/results.svg'
import noAvatar from '@assets/UserDashboard/profile/images/avatar_no.png'

const BrandProfile = () => {
  // Custom hooks for managing brand profile, brand data, and media data
  const { brandProfileData, setBrandProfileData } = useBrandProfile()
  const { brandData, setBrandData } = useBrandData()
  const { mediaData, setMediaData } = useMediaData()

  // Query to fetch brand profile data
  const {
    data: brandProfile,
    isLoading: brandProfileLoading,
    refetch: refetchBrandProfile
  } = useQuery<BrandProfile>('brandProfile', () => getBrandUser(), {
    staleTime: Infinity
  })

  // Mutation for updating brand profile
  const { mutate: updateBrandProfile, isLoading: isUpdatingBrandProfile } = useMutation({
    mutationFn: () => putBrandProfile(brandProfileData)
  })

  // Query to fetch brand data
  const {
    data: brandDataFetch,
    isLoading: brandDataFetchLoading,
    refetch: refetchBrandData
  } = useQuery<BrandData>('brandData', () => getBrandData(), {
    staleTime: Infinity
  })

  // Mutation for updating brand data
  const { mutate: updateBrandData, isLoading: isUpdatingBrandData } = useMutation({
    mutationFn: () => putBrandData(brandData)
  })

  // Query to fetch media data
  const {
    isLoading: mediaDataLoading,
    data: mediaDataFetch,
    refetch: mediaRefetch
  } = useQuery('profileMedia', () => getMedia(), {
    staleTime: Infinity
  })

  // Mutation for updating media data
  const { mutate: updateMedia, isLoading: isUpdatingMedia } = useMutation({
    mutationFn: () => postMediaChannels(mediaData)
  })

  // Effect to refetch media data after updating media channels
  useEffect(() => {
    if (!isUpdatingMedia && mediaDataFetch) {
      mediaRefetch()
    }
  }, [isUpdatingMedia])

  // Effect to set media data after fetching media channels
  useEffect(() => {
    if (!mediaDataLoading && mediaDataFetch) {
      setMediaData(mediaDataFetch.media_channels_list)
    }
  }, [mediaDataLoading, mediaDataFetch])

  // Effect to set brand profile data after fetching brand profile
  useEffect(() => {
    if (brandProfile) {
      setBrandProfileData(brandProfile)
    }
  }, [brandProfile])

  // Effect to set brand data after fetching brand data
  useEffect(() => {
    if (brandDataFetch) {
      setBrandData(brandDataFetch)
    }
  }, [brandDataFetch])

  // Effect to refetch brand data after updating brand data
  useEffect(() => {
    if (!isUpdatingBrandData) {
      refetchBrandData()
    }
  }, [isUpdatingBrandData])

  // Effect to refetch brand profile after updating brand profile
  useEffect(() => {
    if (!isUpdatingBrandProfile) {
      refetchBrandProfile()
    }
  }, [isUpdatingBrandProfile])

  // Function to handle the form submission and update the brand profile, brand data, and media data
  const showForm = () => {
    updateBrandProfile()
    updateBrandData()
    updateMedia()
  }

  // Check if the brand profile or brand data is loading
  const brandUserIsLoading = brandProfileLoading || isUpdatingBrandProfile
  const brandIsLoading = brandDataFetchLoading || isUpdatingBrandData

  // Display preloader if brand profile is loading
  if (brandProfileLoading) {
    return <Preloader />
  }

  // Render brand profile component
  return (
    <>
      <div className={styles.mainTopBlock}>
        <span className={styles.mainTopBlock__title}>Profile</span>
        <button
          className={styles.mainTopBlock__btn}
          onClick={showForm}
          disabled={brandUserIsLoading || brandIsLoading}
        >
          {brandUserIsLoading || brandIsLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.infoBlock}>
          <div className={styles.infoBlock__imgBlock}>
            <div className={styles.infoBlock__imgImgBlock}>
              <img
                loading='lazy'
                alt='Profile image'
                className={styles.infoBlock__img}
                //@ts-ignore
                src={
                  !brandUserIsLoading && brandProfileData.link
                    ? brandProfileData.link
                    : noAvatar.src
                }
                onError={(err) => {
                  console.log(err)
                  setBrandProfileData((prevState) => {
                    return {
                      ...prevState,
                      link: noAvatar.src
                    }
                  })
                }}
              />
            </div>
            <div className={styles.infoBlock__imgIconBlock}>
              <label htmlFor='uploadUserPhoto' style={{ cursor: 'pointer' }}>
                <AddAvatarIcon className={styles.infoBlock__imgIcon} />
              </label>
              <input
                type='file'
                name='file'
                id='uploadUserPhoto'
                style={{ display: 'none' }}
                onChange={(event) => {
                  if (event.target.files && event.target.files[0]) {
                    uploadPhoto(event.target.files[0]).then((res) => {
                      if (res.link) {
                        setBrandProfileData((prevState) => {
                          return {
                            ...prevState,
                            link: res.link,
                            file_name: res.filename
                          }
                        })
                      }
                    })
                  }
                }}
              />
            </div>
          </div>
          <span className={styles.infoBlock__name}>
            {brandProfile?.first_name} {brandProfile?.last_name}
          </span>
          <span className={styles.infoBlock__email}>{brandProfileData.email}</span>
          <span className={styles.infoBlock__registered}>Registered on 04.04.2022</span>
          <div className={styles.infoBlock__options}>
            <InfoHashLink link='#personalInformation' active>
              <PersonalInformation className={styles.infoBlock__optionIcon} />
              <span className={styles.infoBlock__optionText}>Personal Information</span>
            </InfoHashLink>
            <InfoHashLink link='#generalInformation'>
              <Results className={styles.infoBlock__optionIcon} />
              <span className={styles.infoBlock__optionText}>Organisation</span>
            </InfoHashLink>
            <InfoHashLink link='#mediaChannels'>
              <MediaChannelsIcon className={styles.infoBlock__optionIcon} />
              <span className={styles.infoBlock__optionText}>Media Channels</span>
            </InfoHashLink>
          </div>
        </div>
        <div className={styles.infoBlock__rightBlock}>
          {/* Personal Information */}
          <BrandInfo brandData={brandProfileData} setBrandData={setBrandProfileData} />

          {/* Organisation */}
          <GeneralInfo brandData={brandData} setBrandData={setBrandData} />

          {/* Media Channels */}
          <MediaChannels
            mediaChannels={mediaData}
            setMediaChannels={(channel: MediaChannel | undefined, value: string) => {
              if (!channel) return
              setMediaData((prevState) => {
                prevState[prevState.indexOf(channel)].url = value
                return [...prevState]
              })
            }}
          />
        </div>
      </div>
    </>
  )
}

export default BrandProfile

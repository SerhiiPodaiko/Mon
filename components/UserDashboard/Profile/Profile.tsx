'use client'
import React, { useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'

import styles from './Profile.module.scss'

import Info from '@components/UserDashboard/Profile/Info/Info'
import MediaLibrary from '@components/UserDashboard/Profile/MediaLibrary/MediaLibrary'
import Performance from '@components/UserDashboard/Profile/Performance/Performance'

import { MediaChannel } from '@lib/api/Dashboard/models'
import { uploadPhoto } from '@lib/api/Dashboard/RightsHolder/uploadPhoto'
import { getMedia } from '@lib/api/Dashboard/RightsHolder/user/profile/getMedia'
import { getUserMe } from '@lib/api/Dashboard/RightsHolder/user/profile/getUserMe'
import { postMediaChannels } from '@lib/api/Dashboard/RightsHolder/user/profile/postMediaChannels'
import { putUserMe } from '@lib/api/Dashboard/RightsHolder/user/profile/putUserMe'

import useMediaData from '@hooks/Dashboard/RightsHolder/user/useMediaData'
import useSportsmanData from '@hooks/Dashboard/RightsHolder/user/useSportsmanData'
import useSportsmanPerformance from '@hooks/Dashboard/RightsHolder/user/useSportsmanPerformance'

import Preloader from '@ui/Preloader/Preloader'

import MediaChannels from './MediaChannels/MediaChannels'

import AddAvatarIcon from '@assets/UserDashboard/profile/icons/addAvatarIcon.svg'
import MediaChannelsIcon from '@assets/UserDashboard/profile/icons/mediaChannels.svg'
import MediaLibraryIcon from '@assets/UserDashboard/profile/icons/mediaLibrary.svg'
import PersonalInformation from '@assets/UserDashboard/profile/icons/personalInformation.svg'
import Results from '@assets/UserDashboard/profile/icons/results.svg'
import noAvatar from '@assets/UserDashboard/profile/images/avatar_no.png'

const Page = () => {
  // Fetching profile data from the server
  const {
    isLoading: profileLoading,
    data: profileData,
    refetch: refetchProfile
  } = useQuery('profile', () => getUserMe(), {
    staleTime: Infinity
  })

  // Fetching media data from the server
  const {
    isLoading: mediaDataLoading,
    data: mediaDataFetch,
    refetch: mediaRefetch
  } = useQuery('profileMedia', () => getMedia(), {
    staleTime: Infinity
  })

  // State and custom hooks for managing user data
  const { userData, setUserData } = useSportsmanData()

  // State and custom hooks for managing sports performance data
  const { sportsmanPerformance, setSportsmanPerformance } = useSportsmanPerformance()

  // State and custom hooks for managing media data
  const { mediaData, setMediaData } = useMediaData()

  // Mutation function and loading state for updating user profile
  const { mutate: updateUserMe, isLoading: isUpdatingProfile } = useMutation({
    mutationFn: () => putUserMe(userData)
  })

  // Mutation function and loading state for updating media channels
  const { mutate: updateMedia, isLoading: isUpdatingMedia } = useMutation({
    mutationFn: () => postMediaChannels(mediaData)
  })

  useEffect(() => {
    // Update user data when profile data is fetched
    if (profileData) {
      setUserData(profileData)
    }

    // Update media data when media data is fetched
    if (!mediaDataLoading && mediaDataFetch) {
      setMediaData(mediaDataFetch.media_channels_list)
    }

    // Refetch profile data after updating profile
    if (!isUpdatingProfile && profileData) {
      refetchProfile()
    }

    // Refetch media data after updating media channels
    if (!isUpdatingMedia && mediaDataFetch) {
      mediaRefetch()
    }
  }, [
    profileData,
    profileLoading,
    mediaDataLoading,
    mediaDataFetch,
    isUpdatingProfile,
    isUpdatingMedia
  ])

  // Function for updating user profile and media channels
  const updateUser = () => {
    console.log('Update user...')
    updateUserMe()
    updateMedia()
  }

  if (profileLoading) {
    // Show a preloader while profile data is being fetched
    return <Preloader />
  }

  return (
    <>
      <div className={styles.mainTopBlock}>
        <span className={styles.mainTopBlock__title}>Profile</span>
        <button
          className={styles.mainTopBlock__btn}
          onClick={updateUser}
          disabled={isUpdatingProfile}
        >
          {isUpdatingProfile ? 'Saving...' : 'Save'}
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
                src={!profileLoading && userData.link !== null ? userData.link : noAvatar.src}
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
                    // Upload the selected photo and update the user data
                    uploadPhoto(event.target.files[0]).then((res) => {
                      if (res.link) {
                        setUserData((s) => ({
                          ...s,
                          link: res.link,
                          file_name: res.filename
                        }))
                      }
                    })
                  }
                }}
              />
            </div>
          </div>
          <span className={styles.infoBlock__name}>
            {profileData?.first_name} {profileData?.last_name}
          </span>
          <span className={styles.infoBlock__email}>{profileData?.email}</span>
          <span className={styles.infoBlock__registered}>Registered on 04.04.2022</span>
          <div className={styles.infoBlock__options}>
            <a
              href={'#personalInformation'}
              className={`${styles.infoBlock__option} ${styles.infoBlock__option__active}`}
            >
              <PersonalInformation className={styles.infoBlock__optionIcon} />
              <span className='infoBlock__optionText'>Personal Information</span>
            </a>

            <a href={'#mediaLibrary'} className={styles.infoBlock__option}>
              <MediaLibraryIcon className={styles.infoBlock__optionIcon} />
              <span className={styles.infoBlock__optionText}>Media Library</span>
            </a>
            <a href={'#mediaChannels'} className={styles.infoBlock__option}>
              <MediaChannelsIcon className={styles.infoBlock__optionIcon} />
              <span className={styles.infoBlock__optionText}>Media Channels</span>
            </a>
            <a href={'#performance'} className={styles.infoBlock__option}>
              <Results className={styles.infoBlock__optionIcon} />
              <span className={styles.infoBlock__optionText}>Performance</span>
            </a>
          </div>
        </div>
        <div className={styles.infoBlock__rightBlock}>
          <Info userData={userData} setUserData={setUserData} />
          <MediaLibrary />
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
          <Performance
            sportsmanPerformance={sportsmanPerformance}
            setSportsmanPerformance={setSportsmanPerformance}
          />
        </div>
      </div>
    </>
  )
}

export default Page

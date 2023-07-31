'use strict'
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react'
import { useMutation } from 'react-query'

import 'swiper/css'
import './Option.module.scss'
import styles from '@components/UserDashboard/Profile/Performance/Performance.module.scss'

import { uploadPhoto } from '@lib/api/Dashboard/RightsHolder/uploadPhoto'
import { deletePerformanceData } from '@lib/api/Dashboard/RightsHolder/user/profile/deletePerformanceData'
import { SportsmanPerformance } from '@lib/api/Dashboard/RightsHolder/user/profile/models'
import { postPerformanceData } from '@lib/api/Dashboard/RightsHolder/user/profile/postPerformanceData'
import { putPerformanceData } from '@lib/api/Dashboard/RightsHolder/user/profile/putPerformanceData'

import ModalPhotoSlider from '@ui/ModalPhotoSlider/ModalPhotoSlider'
import Preloader from '@ui/Preloader/Preloader'

import CleanPlus from '@assets/UserDashboard/profile/icons/cleanPlus.svg'
import DeleteBtn from '@assets/UserDashboard/profile/icons/deleteBtn.svg'
import DeleteGallery from '@assets/UserDashboard/profile/icons/deleteGallery.svg'
import EyeGallery from '@assets/UserDashboard/profile/icons/eyeGallery.svg'
import Pen from '@assets/UserDashboard/profile/icons/pen.svg'

type OptionProps = {
  option: SportsmanPerformance
  setOptions: Dispatch<SetStateAction<SportsmanPerformance[]>>
  refetch: () => void
  activeOption: string | null
  onToggleOption: (activeOption: string) => void
}

const Option: FC<OptionProps> = ({ option, setOptions, refetch, activeOption, onToggleOption }) => {
  // State variables
  const [imageLoading, setImageLoading] = useState(true)
  const [open, setIsOpen] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [isUploadImg, setIsUploadImg] = useState(false)

  // Check if the current option is open
  const isOpen = activeOption === option.pk

  // Callback function to handle image load event
  const handleImageLoad = () => {
    setImageLoading(false)
  }

  // Callback function to toggle the option's open/close state
  const handleToggle = () => {
    onToggleOption(option.pk)
  }

  // Callback function to handle input change
  const handleChange = useCallback(
    (value: string, el: SportsmanPerformance, type: string, isDate: boolean) => {
      if (isDate) {
        value = value.replace(/\D/g, '')
      }
      setOptions((state) => {
        const updatedState = state.map((currOption) => {
          if (currOption.pk === el.pk) {
            const updatedOption = { ...currOption, [type]: value }
            return updatedOption
          }
          return currOption
        })

        return updatedState
      })
    },
    [setOptions]
  )

  // Mutation functions using react-query for API requests
  const {
    mutate: saveSportsmanPerformance,
    isLoading: isSaving,
    isError
  } = useMutation({
    mutationFn: () => putPerformanceData(option).then(() => refetch())
  })

  const { mutate: addSportsmanPerformance } = useMutation({
    mutationFn: () => postPerformanceData(option).then(() => refetch())
  })

  const { mutate: deleteSportsmanPerformance } = useMutation({
    mutationFn: () => deletePerformanceData(option)
  })

  // Handle error and refetch on error
  useEffect(() => {
    if (isError) {
      refetch()
    }
  }, [option, isError, refetch])

  // Delete the performance option
  const deleteOption = (option: SportsmanPerformance) => {
    if (option.pk !== '') {
      deleteSportsmanPerformance()
    }
    setIsOpen(false)
    setOptions((state) => state.filter((el) => el.pk !== option.pk))
  }

  // Save or add the performance option
  const savePerformance = () => {
    if (option.pk !== '') {
      return saveSportsmanPerformance()
    }
    return addSportsmanPerformance()
  }

  // Delete a photo from the option's gallery
  const deletePhoto = (photo: string) => {
    setOptions((state) => {
      const updatedState = state.map((currOption) => {
        if (currOption.pk === option.pk) {
          const updatedGallery = currOption.gallery.filter((el) => el !== photo)
          return { ...currOption, gallery: updatedGallery }
        }
        return currOption
      })

      return updatedState
    })
    savePerformance()
  }

  // Add a photo to the option's gallery
  const addPhoto = useCallback(
    (file: File) => {
      setIsUploadImg(true)
      uploadPhoto(file).then((res) => {
        if (res.link && res.filename) {
          setOptions((state) => {
            const updatedState = state.map((currOption) => {
              if (currOption.pk === option.pk) {
                const updatedGallery = currOption.gallery
                  ? [...currOption.gallery, res.filename]
                  : [res.filename]
                const updatedGalleryFilesLinks = currOption.gallery_files_links
                  ? { ...currOption.gallery_files_links, [res.filename]: res.link }
                  : { [res.filename]: res.link }

                return {
                  ...currOption,
                  gallery: updatedGallery,
                  gallery_files_links: updatedGalleryFilesLinks
                }
              }
              return currOption
            })

            return updatedState
          })
          setIsUploadImg(false)
        }
      })
    },
    [option, setOptions]
  )

  return (
    <>
      {/* Modal Photo Slider */}
      <ModalPhotoSlider
        modalIsOpen={modalIsOpen}
        onClose={() => setModalIsOpen(!modalIsOpen)}
        // @ts-ignore
        photosLinks={option.gallery.map((photo) => option.gallery_files_links[photo])}
      />

      {/* Option component */}
      <div className={styles.performance__option}>
        <div className={styles.performance__topOptions} onClick={handleToggle}>
          <div className={styles.performance__topOptionLeft}>
            <span className={styles.performance__inInputTitleText}>{option.name}</span>
            <span className={styles.performance__line}> | </span>
            <span className={styles.performance__inInputTitlePlace}>{option.position}st place</span>
          </div>
          <div className={styles.performance__topOptionRight}>
            {isOpen ? (
              <>
                {/* Save button */}
                <button
                  className={styles.performance__saveBtn}
                  onClick={() => {
                    savePerformance()
                    setIsOpen(!open)
                  }}
                  disabled={
                    option.name === '' ||
                    option.start_date === '' ||
                    option.end_date === '' ||
                    option.location === ''
                  }
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </button>

                {/* Delete button */}
                <div className={styles.performance__removeBtn} onClick={() => deleteOption(option)}>
                  <DeleteBtn className={styles.performance__removeBtnImg} />
                </div>
              </>
            ) : (
              <Pen className={styles.performance__editBtn} onClick={handleToggle} />
            )}
          </div>
        </div>
        {isOpen ? (
          <div className={styles.performance__bottomOptions}>
            {/* Competition Name */}
            <div className={styles.performance__bottomOption}>
              <label className={styles.performance__label} htmlFor='name'>
                Competition name *
              </label>
              <input
                value={option.name}
                onChange={(e) => handleChange(e.target.value, option, 'name', false)}
                className={styles.performance__input}
                id='name'
                type='text'
              />
            </div>

            {/* Place, Start Date, End Date */}
            <div className={styles.performance__bottomOption}>
              <div className={styles.performance__smallOptions}>
                <div className={styles.performance__smallOption}>
                  <label className={styles.performance__smallLabel} htmlFor='position'>
                    Place *
                  </label>
                  <input
                    value={option.position}
                    onChange={(e) => handleChange(e.target.value, option, 'position', false)}
                    className={styles.performance__smallInput}
                    id='position'
                    type='text'
                  />
                </div>
                <div className={styles.performance__smallOption}>
                  <label className={styles.performance__smallLabel}>Start of competition *</label>
                  <div>
                    <input
                      className={styles.performance__smallDatePicker}
                      value={Number(option.start_date)}
                      onChange={(e) => handleChange(e.target.value, option, 'start_date', true)}
                      type='text'
                    />
                  </div>
                </div>
                <div className={styles.performance__smallOption}>
                  <label className={styles.performance__smallLabel}>End of competition *</label>
                  <div>
                    <input
                      className={styles.performance__smallDatePicker}
                      value={Number(option.end_date)}
                      onChange={(e) => handleChange(e.target.value, option, 'end_date', true)}
                      type='text'
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className={styles.performance__bottomOption}>
              <label className={styles.performance__label} htmlFor='location'>
                Location *
              </label>
              <input
                className={styles.performance__input}
                id='location'
                type='text'
                value={option.location}
                onChange={(e) => handleChange(e.target.value, option, 'location', false)}
              />
            </div>

            {/* Gallery */}
            <div className={styles.performance__bottomOption}>
              <span className={styles.performance__bottomTitle}>Gallery</span>
              <div className={styles.performance__bottomGallery}>
                {isUploadImg && (
                  <div style={{ scale: '.5' }}>
                    <Preloader />
                  </div>
                )}

                {/* Render existing photos */}
                {option.gallery &&
                  !isUploadImg &&
                  option.gallery.map((img, i) => (
                    <div key={i} className={`${styles.performance__photoBlock}`}>
                      <div className={styles.performance__photoMainBlock}>
                        {imageLoading && (
                          <div style={{ scale: '.5' }}>
                            <Preloader />
                          </div>
                        )}
                        <img
                          loading='lazy'
                          alt='photo'
                          className={styles.performance__photo}
                          onLoad={handleImageLoad}
                          sizes='(min-width: 133px) 133px'
                          // @ts-ignore
                          src={option.gallery_files_links[img]}
                        />
                        <div
                          className={`${styles.performance__photoEditBlock} ${styles.performance__photoEditBlock_active}`}
                        >
                          <div className={styles.performance__photoEdit}>
                            {/* Eye icon for photo slider */}
                            <EyeGallery
                              className={styles.performance__eyeGallery}
                              onClick={() => setModalIsOpen(!modalIsOpen)}
                            />

                            {/* Delete icon for photo */}
                            <DeleteGallery
                              className={styles.performance__deleteGallery}
                              onClick={() => deletePhoto(img)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                {/* Upload photo option */}
                {!isUploadImg && (
                  <>
                    <label htmlFor='uploadBlock' className={styles.performance__uploadBlock}>
                      <CleanPlus className={styles.performance__uploadImg} />
                      <span className={styles.performance__uploadSpan}>Upload</span>
                    </label>
                    <input
                      type='file'
                      id='uploadBlock'
                      style={{ display: 'none' }}
                      onChange={(event) => {
                        if (event.target.files && event.target.files[0]) {
                          addPhoto(event.target.files[0])
                        }
                      }}
                    />
                  </>
                )}
              </div>
            </div>

            {/* Additional information */}
            <span className={styles.performance__bottomUnderText}>
              Maximum 8 images and maximum size of image is 200 kB
            </span>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default Option

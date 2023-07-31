import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import styles from './MediaLibrary.module.scss'

import MediaOptionEditor from '@components/UserDashboard/Profile/MediaLibrary/MediaOptionEditor/MediaOptionEditor'

import { uploadPhoto } from '@lib/api/Dashboard/RightsHolder/uploadPhoto'
import { getMediaLibrary } from '@lib/api/Dashboard/RightsHolder/user/profile/MediaLibrary/getMediaLibrary'
import { postGallery } from '@lib/api/Dashboard/RightsHolder/user/profile/MediaLibrary/postGallery'
import {
  MediaLibraryGallery,
  MediaLibraryVideo
} from '@lib/api/Dashboard/RightsHolder/user/profile/models'

import Preloader from '@ui/Preloader/Preloader'

import BluePlus from '@assets/UserDashboard/profile/icons/bluePlus.svg'
import CleanPlus from '@assets/UserDashboard/profile/icons/cleanPlus.svg'
import DeleteGallery from '@assets/UserDashboard/profile/icons/deleteGallery.svg'

const MediaLibrary = () => {
  const { isLoading, data, refetch } = useQuery('mediaLibrary', () => getMediaLibrary(), {
    staleTime: Infinity
  })
  const [options, setOptions] = useState<MediaLibraryVideo[]>([])
  const [images, setImages] = useState<MediaLibraryGallery>({
    files: [],
    gallery_files_links: {},
    pk: ''
  })
  const [isUploadImage, setIsUploadImg] = useState<boolean>(false)

  useEffect(() => {
    if (data) {
      setOptions(data.media_library_videos)
      setImages(data.media_library_gallery)
    }
  }, [isLoading, data])

  // Add a new video option
  const addNewOption = () => {
    setOptions((prevState) => {
      return [
        ...prevState,
        {
          link: '',
          video_type: 'Award',
          title: '',
          pk: ''
        }
      ]
    })
  }

  // Delete a gallery photo
  const deletePhoto = (photo: string) => {
    const postData = {
      files: [...images.files.filter((el) => el !== photo)]
    }
    postGallery(postData).then(() => refetch())
  }

  // Add a gallery photo
  const addPhoto = (file: File) => {
    setIsUploadImg(true)
    uploadPhoto(file).then((res) => {
      if (res.link && res.filename) {
        if (images === null) {
          const postData = {
            files: [res.filename]
          }
          postGallery(postData).then(() => {
            refetch().then(() => setIsUploadImg(false))
          })
          return
        }
        const postData = {
          files: [...images.files, res.filename]
        }
        postGallery(postData).then(() => {
          refetch().then(() => setIsUploadImg(false))
        })
      }
    })
  }

  return (
    <div className={styles.mediaLibrary} id={'mediaLibrary'}>
      <span className={styles.mediaLibrary__title}>Media Library</span>
      <span className={styles.mediaLibrary__subTitle}>
        Share with potential partners your best sports moments.
      </span>
      <div className={styles.mediaLibrary__optionsBlock}>
        <span className={styles.mediaLibrary__optionsTitle}>Add a new video</span>
        <div className={styles.mediaLibrary__options}>
          {options.map((option) => (
            <MediaOptionEditor
              key={option.pk}
              option={option}
              setOptions={setOptions}
              refetch={refetch}
              active={option.pk === ''}
            />
          ))}
        </div>
        <div className={styles.mediaLibrary__addResult} onClick={() => addNewOption()}>
          <BluePlus className={styles.mediaLibrary__addResultImg} />
          <span className={styles.mediaLibrary__addResultSpan}>Add a new video</span>
        </div>
      </div>
      <div className={styles.mediaLibrary__bottomOption}>
        <span className={styles.mediaLibrary__bottomTitle}>Upload gallery*</span>
        <div className={styles.mediaLibrary__bottomGallery}>
          {isUploadImage && (
            <div style={{ scale: '.5' }}>
              <Preloader />
            </div>
          )}

          {images &&
            images.files &&
            !isUploadImage &&
            images.files.map((img, i) => (
              <div key={i} className={`${styles.mediaLibrary__photoBlock}`}>
                <div className={styles.mediaLibrary__photoMainBlock}>
                  <img
                    loading='lazy'
                    alt='photo'
                    className={styles.mediaLibrary__photo}
                    //@ts-ignore
                    src={images.gallery_files_links[img]}
                  />
                  <div
                    className={`${styles.mediaLibrary__photoEditBlock} ${styles.mediaLibrary__photoEditBlock_active}`}
                  >
                    <div className={styles.mediaLibrary__photoEdit}>
                      <DeleteGallery
                        className={styles.mediaLibrary__deleteGallery}
                        onClick={() => deletePhoto(img)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {!isUploadImage && (
            <>
              <label
                htmlFor={'uploadMediaLibraryGallery'}
                className={styles.mediaLibrary__uploadBlock}
              >
                <CleanPlus className={styles.mediaLibrary__uploadImg} />
                <span className={styles.mediaLibrary__uploadSpan}>Upload</span>
              </label>
              <input
                type='file'
                id={'uploadMediaLibraryGallery'}
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
        <span className={styles.mediaLibrary__bottomUnderText}>
          Maximum 8 images and maximum size of image is 200 kB
        </span>
      </div>
    </div>
  )
}

export default MediaLibrary

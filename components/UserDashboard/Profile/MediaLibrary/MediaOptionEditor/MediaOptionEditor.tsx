import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'

import styles from './MediaOptionEditor.module.scss'

import { getVideoTypes } from '@lib/api/Dashboard/RightsHolder/user/profile/getVideoTypes'
import { deleteVideo } from '@lib/api/Dashboard/RightsHolder/user/profile/MediaLibrary/deleteVideo'
import { postVideo } from '@lib/api/Dashboard/RightsHolder/user/profile/MediaLibrary/postVideo'
import { putVideo } from '@lib/api/Dashboard/RightsHolder/user/profile/MediaLibrary/putVideo'
import { MediaLibraryVideo, VideoTypes } from '@lib/api/Dashboard/RightsHolder/user/profile/models'

import DropdownPicker from '@ui/DashBoard/DropdownPicker/DropdownPicker'

import DeleteBtn from '@assets/UserDashboard/profile/icons/deleteBtn.svg'
import Pen from '@assets/UserDashboard/profile/icons/pen.svg'

type Props = {
  option: MediaLibraryVideo
  setOptions: Dispatch<SetStateAction<MediaLibraryVideo[]>>
  refetch: any
  active?: boolean
}

const MediaOptionEditor: FC<Props> = ({ option, setOptions, refetch, active }) => {
  const [isOpen, setIsOpen] = useState(active || false)

  // Fetching data using react-query hooks
  const { data: videoTypes } = useQuery<VideoTypes>('videoTypes', () => getVideoTypes(), {
    staleTime: Infinity
  })

  // Handler for input change
  const handleChange = useCallback(
    (value: string, el: MediaLibraryVideo, type: string) => {
      setOptions((state) => {
        const updatedState = state.map((option) => {
          if (option.pk === el.pk) {
            return { ...option, [type]: value }
          }
          return option
        })

        return updatedState
      })
    },
    [setOptions]
  )

  // Mutation for saving video
  const {
    mutate: saveVideo,
    isLoading: isSaving,
    isError
  } = useMutation({
    mutationFn: () => putVideo(option).then(() => refetch())
  })

  // Mutation for adding video
  const { mutate: addVideo } = useMutation({
    mutationFn: () => postVideo(option).then(() => refetch())
  })

  // Mutation for deleting video
  const { mutate: deleteVideoM } = useMutation({
    mutationFn: () => deleteVideo(option.pk).then(() => refetch())
  })

  // Handle error and refetch
  useEffect(() => {
    if (isError) {
      refetch()
    }
  }, [option, isError, refetch])

  // Save video performance
  const savePerformance = () => {
    if (option.pk !== '') {
      return saveVideo()
    }
    return addVideo()
  }

  // Delete option
  const deleteOption = (option: MediaLibraryVideo) => {
    if (option.pk !== '') {
      deleteVideoM()
    }
    setIsOpen(false)
    setOptions((state) => [...state.filter((el) => el.pk !== option.pk)])
  }

  return (
    <div className={styles.editorVideo__option}>
      <div className={styles.editorVideo__topOptions} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.editorVideo__topOptionLeft}>
          <span className={styles.editorVideo__inInputTitleText}>{option.title}</span>
          <span className={styles.editorVideo__line}> | </span>
          <span className={styles.editorVideo__inInputTitlePlace}>{option.video_type}</span>
        </div>
        <div className={styles.editorVideo__topOptionRight}>
          {isOpen ? (
            <>
              <button
                className={styles.editorVideo__saveBtn}
                onClick={() => {
                  savePerformance()
                  setIsOpen(!isOpen)
                }}
                disabled={option.title === ''}
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
              <div className={styles.editorVideo__removeBtn} onClick={() => deleteOption(option)}>
                <DeleteBtn className={styles.editorVideo__removeBtnImg} />
              </div>
            </>
          ) : (
            <Pen className={styles.editorVideo__editBtn} onClick={() => setIsOpen(!isOpen)} />
          )}
        </div>
      </div>
      {isOpen ? (
        <div className={styles.editorVideo__bottomOptions}>
          {/* Video Title */}
          <div
            className={`${styles.editorVideo__bottomOption} ${styles.editorVideo__bottomOptionTitle}`}
          >
            <label className={styles.editorVideo__label} htmlFor='title'>
              Video title *
            </label>
            <input
              value={option.title}
              onChange={(e) => handleChange(e.target.value, option, 'title')}
              className={styles.editorVideo__input}
              id='title'
              type='text'
            />
          </div>
          {/* Video Type */}
          <div
            className={`${styles.editorVideo__bottomOption} ${styles.editorVideo__bottomOptionSpan}`}
          >
            <label className={styles.editorVideo__label} htmlFor='videoType'>
              Video type *
            </label>
            <DropdownPicker<string>
              id={'videoType'}
              items={videoTypes ? videoTypes : []}
              checked={option.video_type === null ? '' : option.video_type}
              setChecked={(el) => {
                handleChange(el, option, 'video_type')
              }}
              className={styles.editorVideo__typeInput}
            />
          </div>
          {/* Video Link */}
          <div
            className={`${styles.editorVideo__bottomOption} ${styles.editorVideo__bottomOptionLink}`}
          >
            <label className={styles.editorVideo__label} htmlFor='link'>
              Link *
            </label>
            <input
              value={option.link}
              onChange={(e) => handleChange(e.target.value, option, 'link')}
              className={styles.editorVideo__input}
              id='link'
              type='text'
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default MediaOptionEditor

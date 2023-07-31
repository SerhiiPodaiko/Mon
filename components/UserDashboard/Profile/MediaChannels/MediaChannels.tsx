'use strict'
import styles from './MediaChannels.module.scss'

import { MediaChannel } from '@lib/api/Dashboard/models'

import Facebook from '@assets/UserDashboard/profile/icons/facebook.svg'
import Instagram from '@assets/UserDashboard/profile/icons/instagram.svg'
import TickTock from '@assets/UserDashboard/profile/icons/tickTock.svg'
import Twitch from '@assets/UserDashboard/profile/icons/twitch.svg'
import Twitter from '@assets/UserDashboard/profile/icons/twitter.svg'
import WebSite from '@assets/UserDashboard/profile/icons/webSite.svg'
import Youtube from '@assets/UserDashboard/profile/icons/youtube.svg'

type Props = {
  mediaChannels: MediaChannel[]
  setMediaChannels: (channel: MediaChannel | undefined, value: string) => void
}

const MediaChannels = ({ mediaChannels, setMediaChannels }: Props) => {
  return (
    <div className={styles.mediaChannels} id={'mediaChannels'}>
      {/* Title */}
      <span className={styles.mediaChannels__title}>Media Channels</span>
      {/* Subtitle */}
      <span className={styles.mediaChannels__subTitle}>
        It helps us gather data and analytics from your media channels.
      </span>
      <div className={styles.mediaChannels__form}>
        {/* YouTube */}
        <div className={`${styles.mediaChannels__option} ${styles.mediaChannels__youTube}`}>
          <label className={styles.mediaChannels__label} htmlFor='YouTube'>
            YouTube
          </label>
          <div className={styles.mediaChannels__inputBlock}>
            <Youtube className={styles.mediaChannels__inputIcon} />
            <input
              className={styles.mediaChannels__input}
              id='YouTube'
              type='text'
              value={mediaChannels?.find((el) => el.media_type === 'YouTube')?.url || ''}
              onChange={(e) =>
                setMediaChannels(
                  mediaChannels?.find((el) => el.media_type === 'YouTube'),
                  e.target.value
                )
              }
            />
          </div>
        </div>
        {/* Instagram */}
        <div className={`${styles.mediaChannels__option} ${styles.mediaChannels__instagram}`}>
          <label className={styles.mediaChannels__label} htmlFor='Instagram'>
            Instagram
          </label>
          <div className={styles.mediaChannels__inputBlock}>
            <Instagram className={styles.mediaChannels__inputIcon} />
            <input
              className={styles.mediaChannels__input}
              id='Instagram'
              type='text'
              value={mediaChannels?.find((el) => el.media_type === 'Instagram')?.url || ''}
              onChange={(e) =>
                setMediaChannels(
                  mediaChannels?.find((el) => el.media_type === 'Instagram'),
                  e.target.value
                )
              }
            />
          </div>
        </div>
        {/* Twitter */}
        <div className={`${styles.mediaChannels__option} ${styles.mediaChannels__twitter}`}>
          <label className={styles.mediaChannels__label} htmlFor='Twitter'>
            Twitter
          </label>
          <div className={styles.mediaChannels__inputBlock}>
            <Twitter className={styles.mediaChannels__inputIcon} />
            <input
              className={styles.mediaChannels__input}
              id='Twitter'
              type='text'
              value={mediaChannels?.find((el) => el.media_type === 'Twitter')?.url || ''}
              onChange={(e) =>
                setMediaChannels(
                  mediaChannels?.find((el) => el.media_type === 'Twitter'),
                  e.target.value
                )
              }
            />
          </div>
        </div>
        {/* TikTok */}
        <div className={`${styles.mediaChannels__option} ${styles.mediaChannels__tikTok}`}>
          <label className={styles.mediaChannels__label} htmlFor='TikTok'>
            TikTok
          </label>
          <div className={styles.mediaChannels__inputBlock}>
            <TickTock className={styles.mediaChannels__inputIcon} />
            <input
              className={styles.mediaChannels__input}
              id='TikTok'
              type='text'
              value={mediaChannels?.find((el) => el.media_type === 'TikTok')?.url || ''}
              onChange={(e) =>
                setMediaChannels(
                  mediaChannels?.find((el) => el.media_type === 'TikTok'),
                  e.target.value
                )
              }
            />
          </div>
        </div>
        {/* Facebook */}
        <div className={`${styles.mediaChannels__option} ${styles.mediaChannels__facebook}`}>
          <label className={styles.mediaChannels__label} htmlFor='Facebook'>
            Facebook
          </label>
          <div className={styles.mediaChannels__inputBlock}>
            <Facebook className={styles.mediaChannels__inputIcon} />
            <input
              className={styles.mediaChannels__input}
              id='Facebook'
              type='text'
              value={mediaChannels?.find((el) => el.media_type === 'Facebook')?.url || ''}
              onChange={(e) =>
                setMediaChannels(
                  mediaChannels?.find((el) => el.media_type === 'Facebook'),
                  e.target.value
                )
              }
            />
          </div>
        </div>
        {/* Twitch */}
        <div className={`${styles.mediaChannels__option} ${styles.mediaChannels__twitch}`}>
          <label className={styles.mediaChannels__label} htmlFor='Twitch'>
            Twitch
          </label>
          <div className={styles.mediaChannels__inputBlock}>
            <Twitch className={styles.mediaChannels__inputIcon} />
            <input
              className={styles.mediaChannels__input}
              id='Twitch'
              type='text'
              value={mediaChannels?.find((el) => el.media_type === 'Twitch')?.url || ''}
              onChange={(e) =>
                setMediaChannels(
                  mediaChannels?.find((el) => el.media_type === 'Twitch'),
                  e.target.value
                )
              }
            />
          </div>
        </div>
      </div>
      {/* Website */}
      <div className={`${styles.mediaChannels__bottom} ${styles.mediaChannels__website}`}>
        <label className={styles.mediaChannels__label} htmlFor='Web'>
          Website
        </label>
        <div className={styles.mediaChannels__inputBlock}>
          <WebSite className={styles.mediaChannels__inputIcon} />
          <input
            className={styles.mediaChannels__input}
            id='Web'
            type='text'
            value={mediaChannels?.find((el) => el.media_type === 'Web')?.url || ''}
            onChange={(e) =>
              setMediaChannels(
                mediaChannels?.find((el) => el.media_type === 'Web'),
                e.target.value
              )
            }
          />
        </div>
      </div>
    </div>
  )
}

export default MediaChannels

'use client'

import styles from './About.module.scss'

import useGetAllProducts from '@hooks/Marketplace/useGetAllProducts'

import DisciplineSVG from '@assets/Icons/discipline.svg'
import LanguageImage from '@assets/Icons/language.svg'
import RoleSVG from '@assets/Icons/role.svg'
import WebsiteSVG from '@assets/Icons/website.svg'

const About = () => {
  const { singleSportsmenInfo, isFederateUrlPath, mediaChannels } = useGetAllProducts()

  return (
    <section className={styles.about}>
      <div className={styles.about__head}>
        <h2 className={styles.about__headTitle}>About me</h2>
      </div>
      <div className={styles.about__info}>
        <div className={styles.about__infoItem}>
          <div className={styles.about__infoItemImgWrapper}>
            <RoleSVG />
          </div>
          <div className={styles.about__infoItemWrapper}>
            <h3 className={styles.about__infoItemTitle}>Role</h3>
            <span className={styles.about__infoItemSubtitle}>
              {isFederateUrlPath
                ? 'International Federation'
                : singleSportsmenInfo?.right_holder?.qualification
                ? singleSportsmenInfo?.right_holder?.qualification
                : 'Professional athlete'}
            </span>
          </div>
        </div>
        <div className={styles.about__infoItem}>
          <div className={styles.about__infoItemImgWrapper}>
            <DisciplineSVG />
          </div>
          <div className={styles.about__infoItemWrapper}>
            <h3 className={styles.about__infoItemTitle}>DISCIPLINE</h3>
            <span className={styles.about__infoItemSubtitle}>
              {isFederateUrlPath
                ? 'Budapest, Hungary'
                : singleSportsmenInfo?.right_holder?.kind_of_sport?.name
                ? singleSportsmenInfo?.right_holder?.kind_of_sport?.name
                : ''}
            </span>
          </div>
        </div>
        <div className={styles.about__infoItem}>
          <div className={styles.about__infoItemImgWrapper}>
            <WebsiteSVG />
          </div>
          <div className={styles.about__infoItemWrapper}>
            <h3 className={styles.about__infoItemTitle}>Website</h3>
            <span className={styles.about__infoItemSubtitle}>
              {mediaChannels
                ? mediaChannels.media_channels_list.find((el) => el.media_type === 'Web')?.url ||
                  '-'
                : '-'}
            </span>
          </div>
        </div>
        <div className={styles.about__infoItem}>
          <div className={styles.about__infoItemImgWrapper}>
            <LanguageImage />
          </div>
          <div className={styles.about__infoItemWrapper}>
            <h3 className={styles.about__infoItemTitle}>Language</h3>
            <span className={styles.about__infoItemSubtitle}>
              {isFederateUrlPath
                ? '200 countries'
                : !singleSportsmenInfo?.right_holder?.languages.length
                ? '-'
                : singleSportsmenInfo?.right_holder?.languages
                    .map((lang: any) => lang?.name || lang)
                    .join(', ')}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

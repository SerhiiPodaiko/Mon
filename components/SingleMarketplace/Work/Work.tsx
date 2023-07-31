'use client'
import { usePathname } from 'next/navigation'
import 'swiper/css/pagination'
import { useMediaQuery } from 'react-responsive'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import useRootStore from '@store/RootStore'

import 'swiper/css'
import styles from './Work.module.scss'

import WorkChooseSpecifySVG from '@assets/Images/single-marketplace/work/work-1.svg'
import RequestConnectSVG from '@assets/Images/single-marketplace/work/work-2.svg'
import StarCampaignSVG from '@assets/Images/single-marketplace/work/work-3.svg'
import MeasureResultsSVG from '@assets/Images/single-marketplace/work/work-4.svg'

const Work = () => {
  const urlPathname = usePathname()
  const { cartStore } = useRootStore()
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const isTablet = useMediaQuery({ maxWidth: 992 })

  return (
    <>
      {cartStore.step > 1 && urlPathname?.includes('cart') ? null : (
        <section className={styles.work}>
          <div className={styles.work__head}>
            <h2 className={styles.work__headTitle}>HOW</h2>
            <div className={styles.work__headWrapper}>
              <p className={styles.work__headWrapperSubtitle}>
                does it <span>work</span>
              </p>
            </div>
          </div>
          <div className={styles.work__content}>
            <Swiper
              modules={[Pagination]}
              loop={false}
              direction='horizontal'
              slidesPerView={isMobile ? 1.5 : isTablet ? 3 : 4}
              pagination={{ clickable: true }}
              className={styles.work__steps}
            >
              <SwiperSlide>
                <div className={styles.work__stepsBlock}>
                  <WorkChooseSpecifySVG />
                  <span className={styles.work__stepsBlockTitle}>Choose & specify</span>
                  <span className={styles.work__stepsBlockSubtitle}>
                    Choose the best rights holder for your marketing campaigns.
                  </span>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={styles.work__stepsBlock}>
                  <MeasureResultsSVG />
                  <span className={styles.work__stepsBlockTitle}>Request & Connect</span>
                  <span className={styles.work__stepsBlockSubtitle}>
                    Request mulptiple rights holders to cooperate with them
                  </span>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={styles.work__stepsBlock}>
                  <StarCampaignSVG />
                  <span className={styles.work__stepsBlockTitle}>Start a campaign</span>
                  <span className={styles.work__stepsBlockSubtitle}>
                    Launch a sports-based marketing campaign in minutes
                  </span>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={styles.work__stepsBlock}>
                  <RequestConnectSVG />
                  <span className={styles.work__stepsBlockTitle}>Measure results</span>
                  <span className={styles.work__stepsBlockSubtitle}>
                    Expect the result after the campaign with all needed indicators
                  </span>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </section>
      )}
    </>
  )
}

export default Work

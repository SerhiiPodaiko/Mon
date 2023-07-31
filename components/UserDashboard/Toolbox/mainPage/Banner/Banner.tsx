import styles from './Banner.module.scss'

import bg from '@assets/UserDashboard/toolbox/images/bg.jpg'

const Banner = () => {
  return (
    <div className={styles.toolbox__main}>
      <div className={styles.toolbox__banner} style={{ backgroundImage: `url("${bg.src}")` }}>
        <div className={styles.toolbox__bannerTextBlock}>
          <div className={styles.toolbox__bannerTitle}>Optimize your inventory with AI</div>
          <div className={styles.toolbox__bannerBtn}>Learn more</div>
        </div>
      </div>
    </div>
  )
}

export default Banner

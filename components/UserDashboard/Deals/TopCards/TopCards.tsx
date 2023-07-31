import styles from './TopCards.module.scss'

import CardDrop from '@components/UserDashboard/Toolbox/mainPage/Title/StatisticCard/CardDrop/CardDrop'

import ArrowTop from '@assets/UserDashboard/deals/icons/arrowTop.svg'

const TopCards = () => {
  return (
    <div className={styles.topCards}>
      <div className={styles.topCards__card}>
        <div className={styles.topCards__cardTop}>
          <span className={styles.topCards__cardTopSpan}>32</span>
          <div className={styles.topCards__smallBlock}>
            <ArrowTop className={styles.topCards__smallImg} />
            <span className={styles.topCards__smallSpan}>36%</span>
          </div>
        </div>
        <div className={styles.topCards__cardBottom}>
          <span className={styles.topCards__bottonSpan}>Deals</span>
          <div className={styles.topCards__drop}>
            <CardDrop />
          </div>
        </div>
      </div>
      <div className={styles.topCards__card}>
        <div className={styles.topCards__cardTop}>
          <span className={styles.topCards__cardTopSpan}>12,245€</span>
          <div className={styles.topCards__smallBlock}>
            <ArrowTop className={styles.topCards__smallImg} />
            <span className={styles.topCards__smallSpan}>36%</span>
          </div>
        </div>
        <div className={styles.topCards__cardBottom}>
          <span className={styles.topCards__bottonSpan}>Revenue</span>
          <div className={styles.topCards__drop}>
            <CardDrop />
          </div>
        </div>
      </div>
      <div className={styles.topCards__card}>
        <div className={styles.topCards__cardTop}>
          <span className={styles.topCards__cardTopSpan}>12</span>
          <div className={styles.topCards__smallBlock}>
            <ArrowTop className={styles.topCards__smallImg} />
            <span className={styles.topCards__smallSpan}>12%</span>
          </div>
        </div>
        <div className={styles.topCards__cardBottom}>
          <span className={styles.topCards__bottonSpan}>New partners</span>
          <div className={styles.topCards__drop}>
            <CardDrop />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopCards

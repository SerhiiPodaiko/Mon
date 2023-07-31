import styles from './StatisticCard.module.scss'

import CardDrop from '@components/UserDashboard/Toolbox/mainPage/Title/StatisticCard/CardDrop/CardDrop'

type Props = {
  title: string
  stats: string
  img: any
}

const StatisticCard = ({ title, stats, img }: Props) => {
  return (
    <div className={styles.toolbox__pageTitleCart}>
      <div className={styles.toolbox__pageTitleCartTop}>
        {img}
        <span className={styles.toolbox__pageTitleCartTitle}>{title}</span>
      </div>
      <div className={styles.toolbox__pageTitleCartBottom}>
        <span className={styles.toolbox__pageTitleCartSum}>{stats}</span>
        <div className={styles.toolbox__pageTitleCartBtn}>
          <CardDrop />
        </div>
      </div>
    </div>
  )
}

export default StatisticCard

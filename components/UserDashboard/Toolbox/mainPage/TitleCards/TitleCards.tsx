import React from 'react'

import styles from './TitleCards.module.scss'

import StatisticCard from '@components/UserDashboard/Toolbox/mainPage/Title/StatisticCard/StatisticCard'

import InventoryEffectivity from '@assets/UserDashboard/toolbox/icons/inventoryEffectivity.svg'
import Items from '@assets/UserDashboard/toolbox/icons/items.svg'
import MediaReach from '@assets/UserDashboard/toolbox/icons/mediaReach.svg'
import TotalCost from '@assets/UserDashboard/toolbox/icons/totalCost.svg'

const TitleCards = () => {
  return (
    <div className={styles.toolbox__pageTitleCarts}>
      <StatisticCard
        title='Items'
        img={<Items className={styles.toolbox__pageTitleCartImg} />}
        stats='12'
      />
      <StatisticCard
        title='Revenue'
        img={<TotalCost className={styles.toolbox__pageTitleCartImg} />}
        stats='14,000€'
      />
      <StatisticCard
        title='Media reach'
        img={<MediaReach className={styles.toolbox__pageTitleCartImg} />}
        stats='340k'
      />
      <StatisticCard
        title='Inventory effectivity'
        img={<InventoryEffectivity className={styles.toolbox__pageTitleCartImg} />}
        stats='72%'
      />
    </div>
  )
}

export default TitleCards

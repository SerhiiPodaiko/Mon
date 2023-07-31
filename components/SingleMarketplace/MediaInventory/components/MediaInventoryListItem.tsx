import { useContext } from 'react'
import { motion } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'

import styles from '../MediaInventory.module.scss'

import { SingleMarketplaceContext } from '@context/SingleMarketplace/SingleMarketplaceContext'

const MediaInventoryListItem = ({
  title,
  count,
  handleSelected,
  itemIndex
}: {
  title: string
  count: number
  handleSelected: (index: number) => void
  itemIndex: number
}) => {
  const context = useContext(SingleMarketplaceContext)
  const isMobile = useMediaQuery({ maxWidth: 767 })

  return (
    <motion.div
      layout
      className={`${styles.mediaInventory__sliderItem} ${
        context?.selectedTypeIndex === itemIndex && styles.mediaInventory__sliderItemActive
      } ${isMobile}`}
    >
      <h3 className={styles.mediaInventory__sliderItemTitle}>
        {`${title?.length > 20 ? title?.slice(0, 20) + `...` : title}`}
      </h3>
      <p className={styles.mediaInventory__sliderItemTotal}>{count} items</p>
      <button
        type='button'
        onClick={() => handleSelected(itemIndex)}
        className={styles.mediaInventory__sliderItemBtn}
      >
        View
      </button>
    </motion.div>
  )
}

export default MediaInventoryListItem

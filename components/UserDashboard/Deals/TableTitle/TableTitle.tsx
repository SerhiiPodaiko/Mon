import styles from './TableTitle.module.scss'

const TableTitle = () => {
  return (
    <div className={`${styles.table__line} ${styles.table__topLine}`}>
      <div className={styles.table__topLineLeft}>
        <div className={`${styles.table__topOption} ${styles.table__topChannels}`}>
          <span className={styles.table__topSpan}>Partners</span>
        </div>
      </div>
      <div className={styles.table__topLineRight}>
        <div className={`${styles.table__topOption} ${styles.table__topStatus}`}>
          <span className={styles.table__topSpan}>Status</span>
        </div>
        <div className={`${styles.table__topOption} ${styles.table__topQuantity}`}>
          <span className={styles.table__topSpan}>Quantity</span>
        </div>
        <div className={`${styles.table__topOption} ${styles.table__topBudget}`}>
          <span className={styles.table__topSpan}>Budget</span>
        </div>
        <div className={`${styles.table__topOption} ${styles.table__topView}`}></div>
      </div>
    </div>
  )
}

export default TableTitle

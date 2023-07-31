import styles from './Title.module.scss'

const Title = () => {
  return (
    <div className={styles.toolbox__pageTitleBlock}>
      <div className={styles.toolbox__pageTitleContainer}>
        <span className={styles.toolbox__pageTitle}>Inventory Management</span>
      </div>
    </div>
  )
}

export default Title

import styles from '../Hero.module.scss'

import SearchSVG from '@assets/Icons/search.svg'

const HeroSearch = () => {
  return (
    <div className={styles.hero__search}>
      <form className={styles.hero__form}>
        <div className={styles.hero__form__group}>
          <label htmlFor='location' className={styles.hero__form__label}>
            Where
          </label>
          <input
            type='text'
            id='location'
            className={styles.hero__form__input}
            placeholder='What is location'
          />
        </div>
        <div className={styles.hero__form__group}>
          <label htmlFor='sports' className={styles.hero__form__label}>
            What
          </label>
          <input
            type='text'
            id='sports'
            className={styles.hero__form__input}
            placeholder='What sports'
          />
        </div>
        <div className={styles.hero__form__group}>
          <label htmlFor='type' className={styles.hero__form__label}>
            Who
          </label>
          <input
            type='text'
            id='type'
            className={styles.hero__form__input}
            placeholder='What type'
          />
        </div>
        <div className={styles.hero__form__group}>
          <div className={styles.hero__form__btn}>
            <SearchSVG />
          </div>
        </div>
      </form>
    </div>
  )
}

export default HeroSearch

import styles from './Toolbox.module.scss'

import Categories from '@components/UserDashboard/Toolbox/mainPage/Categories/Categories'
import Title from '@components/UserDashboard/Toolbox/mainPage/Title/Title'
import TitleCards from '@components/UserDashboard/Toolbox/mainPage/TitleCards/TitleCards'

const Toolbox = () => {
  return (
    <div className={styles.toolbox}>
      <Title />
      <div className={styles.toolboxMain}>
        <TitleCards />
        {/*<Banner />*/}
        <Categories />
      </div>
    </div>
  )
}

export default Toolbox

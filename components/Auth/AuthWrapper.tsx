import { useMediaQuery } from 'react-responsive'

import styles from './AuthWrapper.module.scss'

import RobotLineSVG from '@assets/Icons/robots/line.svg'
import RobotSVG from '@assets/Icons/robots/robot-7.svg'

const AuthWrapper = ({ children }: { children: any }) => {
  const isTablet = useMediaQuery({ maxWidth: 992 })

  return (
    <section className={styles.auth}>
      <div className={styles.auth__content}>
        {children}
        {isTablet ? null : (
          <>
            <RobotLineSVG className={styles.auth__robotLine} />
            <RobotSVG className={styles.auth__robot} />
          </>
        )}
      </div>
    </section>
  )
}

export default AuthWrapper

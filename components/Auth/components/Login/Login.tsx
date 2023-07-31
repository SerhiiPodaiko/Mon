'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getCookie, setCookie } from 'cookies-next'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { useMediaQuery } from 'react-responsive'

import styles from './Login.module.scss'

import AuthWrapper from '@components/Auth/AuthWrapper'

import { PAGE_SLUGS } from '@constants/pages'

import { fetchCheckProfile, fetchLogin } from '@lib/api/Auth'

import Preloader from '@ui/Preloader/Preloader'

import LogoSVG from '@assets/Icons/logo-auth.svg'
import RobotMobileSVG from '@assets/Icons/robots/robot-mobile-login.svg'
import RobotTabletSVG from '@assets/Icons/robots/robot-tablet-login.svg'
import RoleSVG from '@assets/Icons/roles.svg'

type Inputs = {
  email: string
  password: string
  user_role: string
}

const Login = () => {
  const [mutationSuccess, setMutationSuccess] = useState(false)
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false)
  const [formErrors, setFormErrors] = useState<boolean>(false)
  const router = useRouter()
  const { register, getValues, handleSubmit, watch } = useForm<Inputs>({ mode: 'onSubmit' })
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const isTablet = useMediaQuery({ maxWidth: 992 })

  const {
    data: dataCheck,
    isSuccess: isSuccessCheck,
    isError: isErrorCheck
  } = useQuery(
    'checkProfile',
    () => fetchCheckProfile(`${getValues('user_role') === 'Brand' ? '/brand' : '/rights_holder'}`),
    {
      enabled: mutationSuccess && getValues('user_role') !== 'Brand'
    }
  )
  const {
    mutate: signInUser,
    isLoading,
    isError: isErrorLogin,
    data: loginData,
    isSuccess: isSuccessLogin
  } = useMutation(
    () =>
      fetchLogin(
        {
          email: getValues('email'),
          password: getValues('password'),
          user_role: getValues('user_role')
        },
        `${getValues('user_role') === 'Brand' ? '/brand' : '/rights_holder'}`
      ),
    {
      onSuccess: () => {
        setMutationSuccess(true)
      },
      onError: () => {
        setMutationSuccess(false)
        setFormErrors(true)
        localStorage.removeItem('Role')
      }
    }
  )

  useEffect(() => {
    setFormErrors(false)
  }, [watch('email'), watch('password')])

  const isBrandCookie =
    (loginData && loginData.user_role === 'Brand') || getCookie('Role') === 'Brand'
  const isAthleteCookie =
    (loginData && loginData.user_role === 'Sportsman (Athlete)') ||
    getCookie('Role') === 'Sportsman (Athlete)'

  useEffect(() => {
    switch (true) {
      case isSuccessLogin && isBrandCookie:
        router.push(PAGE_SLUGS.brandProfile)
        break

      case isSuccessCheck && isAthleteCookie && dataCheck !== null:
        router.push(PAGE_SLUGS.userProfile)
        break

      case isSuccessCheck && !isBrandCookie && dataCheck === null:
        router.push(PAGE_SLUGS.addProfile)
        break
    }
  }, [isSuccessCheck, isErrorCheck, isErrorLogin, dataCheck, isBrandCookie, isSuccessLogin])

  const onSubmitLogin: SubmitHandler<Inputs> = async () => {
    signInUser()
    setCookie('Role', getValues('user_role'))
  }

  return (
    <AuthWrapper>
      <div className={styles.login}>
        <header className={styles.login__header}>
          <span className={styles.login__headerTitle}>log in to</span>
          <Link href={PAGE_SLUGS.home}>
            <LogoSVG />
          </Link>
        </header>
        <form onSubmit={handleSubmit(onSubmitLogin)} className={styles.login__form}>
          <div className={styles.login__group}>
            <label htmlFor='email' className={styles.login__label}>
              EMAIL*
            </label>
            <input
              className={`${styles.login__input} ${formErrors && styles.login__inputError}`}
              {...register('email', {
                required: 'Required field!'
              })}
              placeholder='Enter your email address'
              id='email'
              type='email'
            />
          </div>
          <div className={styles.login__group}>
            <div className={styles.login__wrapper}>
              <label htmlFor='password' className={styles.login__label}>
                PASSWORD
              </label>
              <Link href={PAGE_SLUGS.forgotPassword} className={styles.login__forgotLink}>
                Having trouble to sign in?
              </Link>
            </div>
            <div className={styles.login__wrapper}>
              <input
                className={`${styles.login__input} ${formErrors && styles.login__inputError}`}
                {...register('password', {
                  required: 'Required field!'
                })}
                placeholder='Enter your password'
                id='password'
                type={isVisiblePassword ? 'text' : 'password'}
              />
              <span onClick={() => setIsVisiblePassword((prev) => !prev)}>
                {isVisiblePassword ? 'Hide' : 'Show'}
              </span>
            </div>
          </div>
          <div className={styles.login__group}>
            <div className={styles.login__wrapper}>
              <div className={styles.login__role}>
                <span className={styles.login__roleCircle}>
                  <RoleSVG />
                </span>
                <div className={styles.login__roleInfo}>
                  <span>Enter your role</span>
                  <span>Your partnership depends on your role in the coinizer</span>
                </div>
              </div>
            </div>
            <div className={styles.login__group}>
              <select
                {...register('user_role', {
                  required: 'Required field'
                })}
                className={styles.login__select}
              >
                <option value='' hidden>
                  Enter your role
                </option>
                <option value='Sportsman (Athlete)'>Athlete</option>
                <option value='Brand'>Brand</option>
              </select>
            </div>
          </div>
          <div className={`${styles.login__group} ${styles.login__groupBtn}`}>
            <button
              disabled={isLoading || !watch('email') || !watch('password') || !watch('user_role')}
              className={`${styles.login__btn} ${isSuccessLogin ? styles.login__btnSuccess : ''}`}
            >
              {isLoading ? <Preloader /> : isSuccessLogin ? 'Completed' : 'Log in'}
            </button>
            <span className={styles.login__errorMessage}>
              {formErrors && 'Email Or Password Is Not Correct'}
            </span>
            <div className={styles.login__redirect}>
              <span>Don’t have an account? </span>
              <Link href={PAGE_SLUGS.register} className={styles.login__redirectLink}>
                Sign up
              </Link>
            </div>
          </div>
        </form>
        {isTablet && (
          <div className={styles.login__line}>
            <span></span>
          </div>
        )}
        {isTablet && (
          <>
            {isMobile ? null : (
              <RobotTabletSVG className={`${styles.login__robot} ${styles.login__robotLeft}`} />
            )}
            <RobotMobileSVG className={styles.login__robot} />
          </>
        )}
      </div>
    </AuthWrapper>
  )
}

export default Login

'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { setCookie } from 'cookies-next'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useMediaQuery } from 'react-responsive'

import styles from '../Login/Login.module.scss'

import AuthWrapper from '@components/Auth/AuthWrapper'
import Modal from '@components/Auth/components/modal/Modal'

import { PAGE_SLUGS } from '@constants/pages'

import { fetchRegister } from '@lib/api/Auth/fetchRegister'

import Alert from '@ui/Alert/Alert'
import Preloader from '@ui/Preloader/Preloader'

import CheckBoxSVG from '@assets/Icons/checkbox/checkbox.svg'
import LogoSVG from '@assets/Icons/logo-auth.svg'
import RobotSVG from '@assets/Icons/robots/robot-8.svg'
import RobotMobileSVG from '@assets/Icons/robots/robot-mobile-register.svg'
import RobotTabletSVG from '@assets/Icons/robots/robot-tablet-register.svg'
import SendMessageSVG from '@assets/Icons/send.svg'

type Inputs = {
  email: string
  password: string
  user_role: string
  repeat_password: string
  privacy_policy: string
}

const Register = () => {
  const [modal, setModal] = useState<boolean>(false)
  const [checkboxView, setCheckboxView] = useState<boolean>(false)
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false)
  const [isVisibleRepeatPassword, setIsVisibleRepeatPassword] = useState<boolean>(false)
  const [formErrors, setFormErrors] = useState<boolean>(false)
  const { register, handleSubmit, watch, getValues } = useForm<Inputs>({ mode: 'onSubmit' })
  const { mutate: createUser, isSuccess, isLoading, isError } = useMutation(fetchRegister)
  const isTablet = useMediaQuery({ maxWidth: 992 })
  const isMobile = useMediaQuery({ maxWidth: 767 })

  const onSubmitRegister: SubmitHandler<Inputs> = (data: any) => {
    createUser({ email: data?.email, password: data?.password, user_role: data?.user_role })
    localStorage.setItem('Role', data?.user_role)
    setCookie('Role', getValues('user_role'))
  }

  useEffect(() => {
    isSuccess && setModal(true)
    isError && setFormErrors(true)
  }, [isSuccess, isError])

  useEffect(() => {
    setFormErrors(false)
  }, [watch('email'), watch('password'), watch('repeat_password')])

  return (
    <AuthWrapper>
      <div className={styles.register}>
        <header className={styles.register__header}>
          <span className={styles.register__headerTitle}>Sign up</span>
          <Link href={PAGE_SLUGS.home}>
            <LogoSVG />
          </Link>
        </header>
        <form onSubmit={handleSubmit(onSubmitRegister)} className={styles.register__form}>
          <div className={styles.register__group}>
            <label htmlFor='email' className={styles.register__label}>
              Email*
            </label>
            <input
              className={`${styles.register__input} ${formErrors && styles.register__inputError}`}
              {...register('email', {
                required: 'Required field!'
              })}
              placeholder='Enter email address'
              id='email'
              type='email'
            />
          </div>
          <div className={styles.register__group}>
            <label
              htmlFor='role'
              className={`${styles.register__label} ${styles.register__labelRole}`}
            >
              Add your role*
            </label>
            <select
              {...register('user_role', {
                required: 'Required field'
              })}
              className={styles.register__select}
            >
              <option value='' hidden className={styles.register__select_}>
                Choose role
              </option>
              <span>
                professional athlete retired athlete (should be precise) esports streamer coach
              </span>
              <option value='Sportsman (Athlete)'>Athlete</option>
              <option value='Sportsman (Coach)'>Coach</option>
              <option value='Sportsman Team Representative'>Sportsman Team Representative</option>
              <option value='Sportsman Team'>Sportsman Team</option>
            </select>
          </div>
          <div className={styles.register__group}>
            <div className={styles.register__group__Wrapper}>
              <label htmlFor='password' className={styles.register__label}>
                Password*
              </label>
            </div>
            <div className={styles.register__wrapper}>
              <input
                className={`${styles.register__input} ${formErrors && styles.register__inputError}`}
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
          <div className={styles.register__group}>
            <label htmlFor='repeat_password' className={styles.register__label}>
              Repeat password*
            </label>
            <div className={styles.register__wrapper}>
              <input
                className={`${styles.register__input} ${formErrors && styles.register__inputError}`}
                {...register('repeat_password', {
                  required: 'Required field!'
                })}
                placeholder='Enter your password'
                id='repeat_password'
                type={isVisibleRepeatPassword ? 'text' : 'password'}
              />
              <span onClick={() => setIsVisibleRepeatPassword((prev) => !prev)}>
                {isVisibleRepeatPassword ? 'Hide' : 'Show'}
              </span>
            </div>
          </div>
          <div className={styles.register__group}>
            <div className={styles.register__privacyPolicy} onClick={(e) => e.preventDefault()}>
              <div
                onClick={() => setCheckboxView(!checkboxView)}
                className={`${styles.register__inputCheckCustom} ${
                  checkboxView ? styles.register__inputCheckCustomActive : ''
                }`}
              >
                <input
                  {...register('privacy_policy', {
                    required: {
                      value: true,
                      message: 'Required field!'
                    }
                  })}
                  className={styles.register__inputCheck}
                  id='privacyPolicy'
                  type='checkbox'
                />
                {checkboxView && (
                  <div className={styles.register__inputCheckCustomBlock}>
                    <CheckBoxSVG />
                  </div>
                )}
              </div>
              <label htmlFor='privacyPolicy' className={styles.register__labelCheck}>
                Creating an account means you agree with our {isTablet && <br />}{' '}
                <span>Terms of Service</span> and
                <Link href={process.env.NEXT_PUBLIC_PRIVACY_POLICY as string}>
                  {' '}
                  Privacy Policy.
                </Link>
              </label>
            </div>
          </div>
          <div className={`${styles.register__group} ${styles.register__groupBtn}`}>
            <button
              disabled={
                isLoading ||
                !watch('email') ||
                !watch('password') ||
                !watch('repeat_password') ||
                watch('password') !== watch('repeat_password') ||
                !watch('privacy_policy')
              }
              className={styles.register__btn}
            >
              {isLoading ? (
                <Preloader />
              ) : isSuccess ? (
                'Completed'
              ) : isTablet ? (
                'Sign up'
              ) : (
                'Create an account'
              )}
            </button>
            <span className={styles.register__errorMessage}>
              {formErrors && 'Email or password is not correct'}
            </span>
            <div className={styles.register__redirect}>
              <span>Already have an account?</span>
              <Link href={PAGE_SLUGS.login} className={styles.register__redirectLink}>
                Log In
              </Link>
            </div>
          </div>
        </form>
        {isTablet && (
          <div className={styles.register__line}>
            <span></span>
          </div>
        )}
        {isMobile ? (
          <RobotMobileSVG className={styles.register__robot} />
        ) : isTablet ? (
          <RobotTabletSVG className={styles.register__robot} />
        ) : null}
      </div>
      <Alert />
      <Modal modal={modal}>
        <div className={styles.modalRegister}>
          <SendMessageSVG />
          <span className={styles.modalRegister__text}>
            Account verification link sent to email
          </span>
          <Link href={PAGE_SLUGS.login} className={styles.modalRegister__link}>
            log in
          </Link>
        </div>
        <RobotSVG className={styles.modalRegister__robot} />
      </Modal>
    </AuthWrapper>
  )
}

export default Register

'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useMediaQuery } from 'react-responsive'

import styles from './ForgotPassword.module.scss'

import AuthWrapper from '@components/Auth/AuthWrapper'

import { PAGE_SLUGS } from '@constants/pages'

import { fetchForgotPassword } from '@lib/api/Auth'

import { RegexEmail } from '../../../../utils/validation/email'
import Modal from '../modal/Modal'

import RobotMobileSVG from '@assets/Icons/robots/robor-mobile-forgot-password.svg'
import RobotTabletSVG from '@assets/Icons/robots/robot-mobile-login.svg'
import SendMessageSVG from '@assets/Icons/send.svg'

type Inputs = {
  email: string
}
const ForgotPassword = () => {
  const [modal, setModal] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid }
  } = useForm<Inputs>({ mode: 'onChange' })
  const { mutate: forgotPassword, isSuccess } = useMutation(() =>
    fetchForgotPassword(
      { email: getValues('email') },
      (localStorage.getItem('Role') === 'Brand' && 'brand') || 'rights_holder'
    )
  )
  const isTablet = useMediaQuery({ maxWidth: 992 })
  const isMobile = useMediaQuery({ maxWidth: 767 })

  const onSubmit: SubmitHandler<Inputs> = () => forgotPassword()

  useEffect(() => {
    if (isSuccess) {
      setModal(true)
    }

    return () => setModal(false)
  }, [isSuccess])

  return (
    <AuthWrapper>
      <div className={styles.forgotPassword}>
        <header className={styles.forgotPassword__header}>
          <h2 className={styles.forgotPassword__title}>Forgot password?</h2>
          <div className={styles.forgotPassword__header__wrapper}>
            <p className={styles.forgotPassword__subtitle}>
              Enter the email address you used when you joined and we’ll send you instructions to
              reset your password.
            </p>
            <p className={styles.forgotPassword__subtitle}>
              For security reasons, we do NOT store your password. So rest assured that we will
              never send your password via email.
            </p>
          </div>
        </header>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.forgotPassword__form}>
          <div className={styles.forgotPassword__form__group}>
            <label htmlFor='email' className={styles.forgotPassword__label}>
              Email address
            </label>
            <input
              className={styles.forgotPassword__input}
              {...register('email', {
                required: 'This field must be filled',
                minLength: {
                  value: 5,
                  message: 'Minimum 5 characters'
                },
                pattern: {
                  value: RegexEmail,
                  message: 'Invalid email address'
                }
              })}
              placeholder='Enter email address'
              id='email'
              type='email'
            />
            <span className={styles.forgotPassword__errorMessage}>
              {errors?.email && errors?.email?.message}
            </span>
          </div>

          <button
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid}
            className={styles.forgotPassword__btn}
          >
            Send reset instructions
          </button>
        </form>
        {isMobile && (
          <div className={styles.forgotPassword__line}>
            <span></span>
          </div>
        )}
        {isTablet ? (
          <>
            <RobotMobileSVG
              className={`${styles.forgotPassword__robot} ${styles.forgotPassword__robotLeft}`}
            />
            {isMobile ? null : (
              <RobotTabletSVG
                className={`${styles.forgotPassword__robot} ${styles.forgotPassword__robotRight}`}
              />
            )}
          </>
        ) : isMobile ? (
          <RobotTabletSVG className={styles.forgotPassword__robot} />
        ) : null}
      </div>
      <Modal modal={modal}>
        <div className={styles.modalForgotPassword}>
          <SendMessageSVG />
          <div className={styles.modalForgotPassword__wrapper}>
            <span className={styles.modalForgotPassword__text}>
              Please check email and the description.
            </span>
            <span className={styles.modalForgotPassword__text}>
              We have sent you the link to reset your password to{' '}
              <strong>{getValues('email')}</strong>
            </span>
            <span className={styles.modalForgotPassword__text}>
              Didn't receive an email? Please check spam or request a new one.
            </span>
          </div>
          <Link href={PAGE_SLUGS.login} className={styles.modalForgotPassword__link}>
            Go to login page
          </Link>
        </div>
      </Modal>
    </AuthWrapper>
  )
}

export default ForgotPassword

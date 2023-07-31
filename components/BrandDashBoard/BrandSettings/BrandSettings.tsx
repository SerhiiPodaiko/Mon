'use client'
import React, { FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { useElements, useStripe } from '@stripe/react-stripe-js'

import styles from './BrandSettings.module.scss'

import AddCardForm from '@components/BrandDashBoard/BrandSettings/AddCardForm/AddCardForm'

import { createCard } from '@lib/api/Dashboard/brand/billing/createCard'
import { getCards } from '@lib/api/Dashboard/brand/billing/getCards'
import { Card } from '@lib/api/Dashboard/brand/billing/models'
import { setDefaultCard } from '@lib/api/Dashboard/brand/billing/setDefaultCard'
import { BrandProfile } from '@lib/api/Dashboard/brand/models'
import { getBrandUser } from '@lib/api/Dashboard/brand/user/profile/getBrandUser'
import { changePassword } from '@lib/api/Dashboard/changePassword'
import { getLanguages } from '@lib/api/Dashboard/RightsHolder/user/profile/getLanguages'
import { Language } from '@lib/api/Dashboard/RightsHolder/user/profile/models'

import useLogOut from '@hooks/useLogOut'

import CardBlock from '@ui/DashBoard/Billing/CardBlock'
import CountryPickerWithFlags from '@ui/DashBoard/CountryPickerWithFlags/CountryPickerWithFlags'
import InfoBlock from '@ui/DashBoard/InfoBlock/InfoBlock'
import InfoFormInput from '@ui/DashBoard/InfoBlock/InfoFormInput/InfoFormInput'
import InfoHashLink from '@ui/DashBoard/InfoHashLink/InfoHashLink'
import TopBlockWithSave from '@ui/DashBoard/TopBlockWithSave/TopBlockWithSave'
import Preloader from '@ui/Preloader/Preloader'

import SmallAddPaymentIcon from '@assets/BrandDashBoard/settings/icons/smallAddPayment.svg'
import PersonalInformation from '@assets/UserDashboard/profile/icons/personalInformation.svg'
import AddPaymentIcon from '@assets/UserDashboard/settings/icons/addPayment.svg'
import CardIcon from '@assets/UserDashboard/settings/icons/card.svg'

const BrandSettings = () => {
  // Fetching data using react-query hooks
  const { data: allLanguages, isLoading } = useQuery<Language[]>(
    'languages',
    () => getLanguages(),
    {
      staleTime: Infinity
    }
  )
  const { data: brandProfile, isLoading: brandIsLoading } = useQuery<BrandProfile>(
    'brandProfile',
    () => getBrandUser(),
    {
      staleTime: Infinity
    }
  )
  const {
    data: cards,
    isLoading: cardsIsLoading,
    // isRefetching: cardsIsRefetching, // if we need preloader
    refetch: refetchCards
  } = useQuery<Card[]>('brandCards', () => getCards(), {
    staleTime: Infinity
  })

  // Stripe elements and stripe hook
  const stripe = useStripe()
  const elements = useElements()

  // Log-Out logic functions
  const pathname = usePathname()
  const { logOut } = useLogOut(pathname)

  // State variables
  const [open, setIsOpen] = useState(false)
  const [addCardIsOpen, setAddCardIsOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [checkedCountry, setCheckedCountry] = useState({})

  // Function to check if save button should be disabled
  const checkSaveStatus = () => {
    return (
      newPassword !== confirmPassword ||
      currentPassword === '' ||
      newPassword === '' ||
      confirmPassword === ''
    )
  }

  // Function to handle password change
  const changePass = async (currentPassword: string, newPassword: string) => {
    if (!checkSaveStatus()) {
      toast
        .promise(changePassword(currentPassword, newPassword, 'brand'), {
          pending: 'Changing password...',
          success: 'Password has been changed',
          error: 'Error while changing password'
        })
        .then(() => setTimeout(() => logOut(), 3000))
    }
  }

  // Function to set the default card
  const setDefaultCardHandler = (id: string) => {
    toast
      .promise(setDefaultCard(id), {
        pending: 'Changing default card...',
        success: 'Card has been changed',
        error: 'Error while changing card'
      })
      .then(() => refetchCards())
  }

  // Function to handle form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>, withDefault: boolean) => {
    event.preventDefault()
    // Find name in the form event
    // @ts-ignore
    const { cardName: name } = event.target

    if (!name.value || name.value === '') {
      return toast.error('Please enter a card name')
    }
    // Create token for the card
    // @ts-ignore
    const { error, token } = await stripe.createToken(elements?.getElement('cardNumber'), {
      name: name.value
    })

    if (error) {
      console.log('Stripe error', error)
    } else {
      toast
        .promise(createCard(token.id), {
          pending: 'Adding card...',
          success: 'Card has been added',
          error: 'Error while adding card'
        })
        .then((res) => {
          setAddCardIsOpen(false)
          // If checkbox is checked, set the card as default
          if (withDefault) {
            return setDefaultCard(res.id).then(() => refetchCards())
          }
          // Else just refetch the cards
          refetchCards()
        })
    }
  }

  useEffect(() => {
    if (!isLoading && allLanguages) {
      setCheckedCountry(allLanguages[28])
    }
  }, [allLanguages, isLoading])

  // Render a preloader while data is loading
  if (!allLanguages || isLoading || !brandProfile || brandIsLoading || !cards || cardsIsLoading) {
    return <Preloader />
  }

  return (
    <>
      <TopBlockWithSave
        name='Settings'
        saveCallback={() => changePass(currentPassword, newPassword)}
        disabled={checkSaveStatus()}
      />
      <div className={styles.mainContent}>
        <div className={styles.infoBlock}>
          <div className={styles.infoBlock__options}>
            <InfoHashLink link='#generalSettings' active>
              <PersonalInformation className={styles.infoBlock__optionIcon} />
              <span className={styles.infoBlock__optionText}>General Settings</span>
            </InfoHashLink>
            <InfoHashLink link='#paymentOptions'>
              <PersonalInformation className={styles.infoBlock__optionIcon} />
              <span className={styles.infoBlock__optionText}>Payments</span>
            </InfoHashLink>
          </div>
        </div>
        <div className={styles.infoBlock__rightBlock}>
          <InfoBlock name='General Settings' id='generalSettings'>
            <div className={styles.infoOption__container}>
              <div className={styles.form}>
                <div className={styles.countriesBlock}>
                  <label className={styles.label} htmlFor='countries'>
                    System language
                  </label>
                  <CountryPickerWithFlags
                    countries={allLanguages}
                    // @ts-ignore
                    checked={checkedCountry}
                    setChecked={(country) => {
                      setCheckedCountry(country)
                      setIsOpen(false)
                    }}
                    open={open}
                    setIsOpen={setIsOpen}
                  />
                </div>
                <InfoFormInput
                  id='currentPassword'
                  name='Current password'
                  type='password'
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  withHide={true}
                />
                <InfoFormInput
                  id='newPassword'
                  name='New password'
                  type='password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  description='Your new password must be more than 8 characters.'
                  withHide={true}
                />
                <InfoFormInput
                  id='confirmPassword'
                  name='Confirm new password'
                  type='password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  withHide={true}
                />
              </div>
            </div>
          </InfoBlock>
          <InfoBlock name='Payment Options' id='paymentOptions'>
            {cards.length < 0 ? (
              <div className={styles.infoOption__container}>
                <span className={styles.infoOption__title}>Add a payment method</span>
                <div className={styles.anyPayments__addPaymentBlock}>
                  <div className={styles.anyPayments__addPaymentLeft}>
                    <CardIcon className={styles.anyPayments__addPaymentLeftIcon} />
                  </div>
                  <Link href={'#'} className={styles.anyPayments__addPaymentRight}>
                    <AddPaymentIcon className={styles.anyPayments__addPaymentRightIcon} />
                    <span
                      className={styles.anyPayments__addPaymentRightSpan}
                      onClick={() => setAddCardIsOpen(!addCardIsOpen)}
                    >
                      Add payment method
                    </span>
                  </Link>
                </div>
                {addCardIsOpen && (
                  <AddCardForm stripe={stripe} elements={elements} handleSubmit={handleSubmit} />
                )}
              </div>
            ) : (
              <div className={styles.infoOption__paymentsBlock}>
                <div className={styles.infoOption__container}>
                  <div className={styles.payments__titleBlock}>
                    <span className={styles.payments__titleSpan}>Payment method</span>
                    <div
                      className={styles.payments__titleSpanLeft}
                      onClick={() => setAddCardIsOpen(!addCardIsOpen)}
                    >
                      <SmallAddPaymentIcon className={styles.payments__titleSpanLeftIcon} />
                      <span className={styles.payments__titleSpanLeftSpan}>New</span>
                    </div>
                  </div>
                  {cards.length > 0 && (
                    <div className={styles.payments__actualPaymentsBlock}>
                      {/*{cardsIsLoading || cardsIsRefetching ? (*/}
                      {/*  <Preloader />*/}
                      {/*) : (*/}
                      {/*//   code*/}
                      {/*)}*/}

                      {cards.map((card, i) => (
                        <CardBlock
                          key={card.id}
                          id={card.id}
                          lastNums={card.last4}
                          type={card.brand}
                          isDefault={i === 0}
                          onSetDefault={(id) => setDefaultCardHandler(id)}
                          onDeleteCard={(id) => console.log(`Deleting card with id ${id}`)}
                        />
                      ))}
                    </div>
                  )}
                  {addCardIsOpen && (
                    <AddCardForm stripe={stripe} elements={elements} handleSubmit={handleSubmit} />
                  )}
                </div>
                <div className={styles.infoOption__smallContainer}>
                  <div className={styles.payments__titleBlock}>
                    <span className={styles.payments__titleSpan}>Contact Email</span>
                  </div>
                  <div className={styles.payments__contactEmail}>
                    <div className={styles.payments__contactEmailLeftBlock}>
                      <div
                        className={`${styles.payments__contactEmailCircleBlock} ${styles.payments__contactEmailCircleBlock_active}`}
                      >
                        <div
                          className={`${styles.payments__contactCircle} ${styles.payments__contactCircle_active}`}
                        />
                      </div>
                    </div>
                    <div className={styles.payments__contactEmailTextBlock}>
                      <span className={styles.payments__contactEmailTitle}>
                        Send to my account email
                      </span>
                      <span className={styles.payments__contactEmailSubTitle}>
                        {brandProfile.email}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </InfoBlock>
        </div>
      </div>
    </>
  )
}

export default BrandSettings

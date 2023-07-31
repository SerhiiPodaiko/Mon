'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'

import styles from './Settings.module.scss'

import { changePassword } from '@lib/api/Dashboard/changePassword'
import { getLanguages } from '@lib/api/Dashboard/RightsHolder/user/profile/getLanguages'
import { Language } from '@lib/api/Dashboard/RightsHolder/user/profile/models'
import { getRetrieveLink } from '@lib/api/Dashboard/RightsHolder/user/settings/getRetrieveLink'
import { RetrieveLink } from '@lib/api/Dashboard/RightsHolder/user/settings/models'

import useLogOut from '@hooks/useLogOut'

import CountryPickerWithFlags from '@ui/DashBoard/CountryPickerWithFlags/CountryPickerWithFlags'
import InfoBlock from '@ui/DashBoard/InfoBlock/InfoBlock'
import InfoFormInput from '@ui/DashBoard/InfoBlock/InfoFormInput/InfoFormInput'
import InfoHashLink from '@ui/DashBoard/InfoHashLink/InfoHashLink'
import TopBlockWithSave from '@ui/DashBoard/TopBlockWithSave/TopBlockWithSave'
import Preloader from '@ui/Preloader/Preloader'

import PersonalInformation from '@assets/UserDashboard/profile/icons/personalInformation.svg'
import AddPaymentIcon from '@assets/UserDashboard/settings/icons/addPayment.svg'
import CardIcon from '@assets/UserDashboard/settings/icons/card.svg'

const Settings = () => {
  // Query to fetch all supported languages
  const { data: allLanguages, isLoading } = useQuery<Language[]>(
    'languages',
    () => getLanguages(),
    {
      staleTime: Infinity
    }
  )

  // Query to fetch the retrieve link
  const { data: link, isLoading: isLoadingLink } = useQuery<RetrieveLink>(
    'retrieveLink',
    () => getRetrieveLink(),
    { staleTime: Infinity }
  )

  // Log-Out logic functions
  const pathname = usePathname()
  const { logOut } = useLogOut(pathname)

  const [open, setIsOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [checkedCountry, setCheckedCountry] = useState({})

  useEffect(() => {
    // Set the default checked country
    if (!isLoading && allLanguages) {
      setCheckedCountry(allLanguages[28])
    }
  }, [allLanguages, isLoading])

  // Check if the save button should be disabled
  const checkSaveStatus = () => {
    return (
      newPassword !== confirmPassword ||
      currentPassword === '' ||
      newPassword === '' ||
      confirmPassword === ''
    )
  }

  // Handle password change
  const changePass = async (currentPassword: string, newPassword: string) => {
    if (!checkSaveStatus()) {
      toast
        .promise(changePassword(currentPassword, newPassword, 'rights_holder'), {
          pending: 'Changing password...',
          success: 'Password has been changed',
          error: 'Error while changing password'
        })
        .then(() => setTimeout(() => logOut(), 3000))
    }
  }

  // Display preloader while fetching data
  if (!allLanguages || isLoading) {
    return <Preloader />
  }
  console.log(link)
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
                  type='password'
                  name='Current password'
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  withHide={true}
                />
                <InfoFormInput
                  id='newPassword'
                  type='password'
                  name='New password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  description='Your new password must be more than 8 characters.'
                  withHide={true}
                />
                <InfoFormInput
                  id='confirmPassword'
                  type='password'
                  name='Confirm new password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  withHide={true}
                />
              </div>
            </div>
          </InfoBlock>
          <InfoBlock name='Payment Options' id='paymentOptions'>
            <div className={styles.infoOption__container}>
              <span className={styles.infoOption__title}>Add a payment method</span>
              <div className={styles.anyPayments__addPaymentBlock}>
                <div className={styles.anyPayments__addPaymentLeft}>
                  <CardIcon className={styles.anyPayments__addPaymentLeftIcon} />
                </div>
                {isLoadingLink || !link ? (
                  <Preloader />
                ) : (
                  <Link
                    href={link?.url || '#'}
                    target={'_blank'}
                    className={styles.anyPayments__addPaymentRight}
                  >
                    <AddPaymentIcon className={styles.anyPayments__addPaymentRightIcon} />
                    <span className={styles.anyPayments__addPaymentRightSpan}>
                      Add payment method
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </InfoBlock>
        </div>
      </div>
    </>
  )
}

export default Settings

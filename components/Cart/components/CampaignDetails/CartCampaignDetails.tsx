import { useContext, useEffect } from 'react'
import { useMutation } from 'react-query'
import { useMediaQuery } from 'react-responsive'

import styles from './CartCampaignDetails.module.scss'

import { fetchGetCampaignCart } from '@lib/api/Cart'

import { CartContext } from '@context/Cart/CartContext'

import { validateDate } from '../../../../utils/validation/date'

import WebsiteSVG from '@assets/Icons/website.svg'

const CartCampaignDetails = () => {
  const { register, setValue, errors } = useContext(CartContext)
  const isTablet = useMediaQuery({ maxWidth: 992 })

  const validateMinLength = (value: string, minLength: number) => {
    const trimmedValue = value.replace(/\s/g, '') || value.trim()
    return trimmedValue.length >= minLength || `The minimum field length is ${minLength} characters`
  }

  const getCampaignCartMutate = useMutation(fetchGetCampaignCart)

  useEffect(() => {
    getCampaignCartMutate.mutate(
      { with_count: true },
      {
        onSuccess: (data) => {
          const lastItem = data?.items?.at(-1) || data?.items[data.items.length - 1]

          setValue('campaign_name', lastItem?.campaign_name || '')
          setValue('campaign_description', lastItem?.campaign_description || '')
          setValue('campaign_start_date', lastItem?.campaign_start_date || '')
          setValue('campaign_end_date', lastItem?.campaign_end_date || '')
          setValue('campaign_service_reference', lastItem?.campaign_service_reference || '')
        }
      }
    )
  }, [])

  return (
    <div className={styles.campaignDetails}>
      <h3 className={styles.campaignDetails__title}>Campaign details</h3>
      <form className={styles.campaignDetails__form}>
        <div className={styles.campaignDetails__formGroup}>
          <label className={styles.campaignDetails__formLabel}>Campaign name</label>
          <input
            {...register('campaign_name', {
              required: 'Required field!',
              maxLength: { value: 100, message: 'The maximum length is 100 characters!' }
            })}
            className={styles.campaignDetails__formInput}
            type='text'
            placeholder='Type compaign name'
          />
          {errors?.campaign_name && (
            <span className={styles.campaignDetails__errorMessage}>
              {errors.campaign_name.message}
            </span>
          )}
        </div>
        <div className={styles.campaignDetails__formGroup}>
          <label className={styles.campaignDetails__formLabel}>Campaign details</label>
          <textarea
            {...register('campaign_description', {
              required: true,
              validate: (value: string) => validateMinLength(value, 20)
            })}
            className={styles.campaignDetails__formTextArea}
            placeholder='Describe the campaign'
          ></textarea>
          <span className={styles.campaignDetails__formErrorMessage}>
            {errors.campaign_description && errors.campaign_description.message}
          </span>
        </div>
        <div className={styles.campaignDetails__formGroupRow}>
          <div className={styles.campaignDetails__formGroupRowWrapper}>
            <label className={styles.campaignDetails__formLabel}>Start date</label>
            <input
              {...register('campaign_start_date', {
                required: 'Required field!',
                validate: validateDate
              })}
              className={styles.campaignDetails__formInput}
              placeholder='-- / -- / ----'
            />
            <span className={styles.campaignDetails__formErrorMessage}>
              {errors.campaign_start_date && errors.campaign_start_date.message}
            </span>
          </div>
          <div className={styles.campaignDetails__formGroupRowWrapper}>
            <label className={styles.campaignDetails__formLabel}>End data</label>
            <input
              {...register('campaign_end_date', {
                required: 'Required field!',
                validate: validateDate
              })}
              className={styles.campaignDetails__formInput}
              placeholder='-- / -- / ----'
            />
            <span className={styles.campaignDetails__formErrorMessage}>
              {errors.campaign_end_date && errors.campaign_end_date.message}
            </span>
          </div>
        </div>
        <div className={styles.campaignDetails__formGroup}>
          <label className={styles.campaignDetails__formLabel}>Website</label>
          <div className={styles.campaignDetails__formGroupWebsite}>
            <WebsiteSVG />
            <span>https://</span>
          </div>
          <input
            {...register('campaign_service_reference', {
              required: 'Required field!'
            })}
            className={`${styles.campaignDetails__formInput} ${styles.campaignDetails__formInputWebsite}`}
            placeholder='Enter website link'
          />
        </div>
      </form>
      <footer className={styles.campaignDetails__footer}>
        {isTablet ? null : (
          <span>
            Payments are processed by Monetiseur Ltd. See <a href='#'>Payment Term</a>
          </span>
        )}
      </footer>
    </div>
  )
}

export default CartCampaignDetails

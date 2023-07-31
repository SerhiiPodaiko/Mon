'use client'
import React, { FC, FormEvent, useEffect, useState } from 'react'
import { Stripe, StripeElements } from '@stripe/stripe-js'

import styles from './AddCardForm.module.scss'

import MasterCardIcon from '@public/paymentTypes/mastercard.svg'
import VisaIcon from '@public/paymentTypes/visa.svg'

type Props = {
  //  Stripe is a global object that is used to create a stripe instance
  stripe: Stripe | null
  // Stripe elements is a collection of individual elements that are used to create a payment form
  elements: StripeElements | null
  // Function to handle the form submission
  handleSubmit: (event: FormEvent<HTMLFormElement>, withDefault: boolean) => void
  // Remove Submit Btn if
  withoutSubmit?: boolean
}
const AddCardForm: FC<Props> = ({ stripe, elements, handleSubmit, withoutSubmit }) => {
  // Control the state of withDefault checkbox
  const [withDefault, setWithDefault] = useState(false)

  // Mount card elements to the DOM when the component mounts
  useEffect(() => {
    console.log('Stripe Mount')
    if (
      stripe &&
      elements &&
      !elements.getElement('cardNumber') &&
      !elements.getElement('cardExpiry') &&
      !elements.getElement('cardCvc')
    ) {
      const cardElement = elements.create('cardNumber')
      const cardExpiry = elements.create('cardExpiry')
      const cardCvc = elements.create('cardCvc')

      cardElement.mount('#cardElement')
      cardExpiry.mount('#cardExpiry')
      cardCvc.mount('#cardCvc')
    }

    return () => {
      console.log('Stripe UnMount')
      if (elements) {
        const cardElement = elements.getElement('cardNumber')
        const cardExpiry = elements.getElement('cardExpiry')
        const cardCvc = elements.getElement('cardCvc')

        if (cardElement) {
          cardElement?.destroy()
        }
        if (cardExpiry) {
          cardExpiry?.destroy()
        }
        if (cardCvc) {
          cardCvc?.destroy()
        }
      }
    }
  }, [])

  return (
    <form onSubmit={(event) => handleSubmit(event, withDefault)}>
      <div className={styles.payments__addPaymentsBlock}>
        <div className={styles.payments__addPaymentsTitleBlock}>
          <span className={styles.payments__addPaymentsTitle}>Add new card</span>
          <div className={styles.payments__addPaymentsTypesBlock}>
            <MasterCardIcon className={styles.payments__addPaymentsTypeIcon} />
            <VisaIcon className={styles.payments__addPaymentsTypeIcon} />
          </div>
        </div>
        <div className={styles.payments__addPaymentsOption}>
          <div className={styles.payments__addPaymentsOptionLeft}>
            <span className={styles.payments__addPaymentsOptionTitle}>Card number</span>
            <span className={styles.payments__addPaymentsOptionSubTitle}>
              Enter the 16-digit card number on the card
            </span>
          </div>
          <div className={styles.payments__addPaymentsOptionRight}>
            <div className={styles.payments__addPaymentsOptionInputBlock}>
              <div id='cardElement' />
            </div>
          </div>
        </div>
        <div className={styles.payments__addPaymentsOption}>
          <div className={styles.payments__addPaymentsOptionLeft}>
            <span className={styles.payments__addPaymentsOptionTitle}>Card name</span>
            <span className={styles.payments__addPaymentsOptionSubTitle}>
              Enter the card name as it appears on the card
            </span>
          </div>
          <div className={styles.payments__addPaymentsOptionRight}>
            <div className={styles.payments__addPaymentsOptionInputBlock}>
              <input type='text' name='cardName' />
            </div>
          </div>
        </div>
        <div className={styles.payments__addPaymentsOption}>
          <div className={styles.payments__addPaymentsOptionLeft}>
            <span className={styles.payments__addPaymentsOptionTitle}>Expiry date</span>
            <span className={styles.payments__addPaymentsOptionSubTitle}>
              Enter the expiration date of the card
            </span>
          </div>
          <div className={styles.payments__addPaymentsOptionRight}>
            <div id='cardExpiry' className={styles.payments__addPaymentsOptionInputBlock} />
            <div className={styles.payments__addPaymentsOptionCvvBlock}>
              <div className={styles.payments__addPaymentsOptionCvvTextBlock}>
                <span className={styles.payments__addPaymentsOptionTitle}>CVV2</span>
                <span className={styles.payments__addPaymentsOptionSubTitle}>Security code</span>
              </div>
              <div id='cardCvc' className={styles.payments__addPaymentsOptionInputBlock} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.payments__buttomBlock}>
        {!withoutSubmit && (
          <button className={styles.payments__submitBtn} type='submit'>
            Submit
          </button>
        )}
        {/*Checkbox to withDefault state*/}
        <div className={styles.payments__defaultWrapper}>
          <input
            type='checkbox'
            name='withDefault'
            value='withDefault'
            checked={withDefault}
            onChange={(e) => setWithDefault(e.target.checked)}
          />
          <label htmlFor='withDefault' className={styles.payments__defaultCheckBox}>
            Set as default
          </label>
        </div>
      </div>
    </form>
  )
}

export default AddCardForm

'use client'
import React, { FC, FormEvent, useContext, useEffect, useState } from 'react'
import { Stripe, StripeElements } from '@stripe/stripe-js'

import styles from './CartAddCardForm.module.scss'

import { CartContext } from '@context/Cart/CartContext'

import Path from '@assets/Path.svg'

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
const AddCardForm: FC<Props> = ({ stripe, elements, handleSubmit }) => {
  // Control the state of withDefault checkbox
  const [withDefault, setWithDefault] = useState(false)
  const { paymentFormRef } = useContext(CartContext)

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
    <form
      ref={paymentFormRef}
      onSubmit={(event) => handleSubmit(event, withDefault)}
      className={styles.formContainer}
    >
      <div className={styles.formContainer__topBtnsBlock}>
        <div className={styles.formContainer__wrapper}>
          <div className={styles.formContainer__inputBlock}>
            <span className={styles.formContainer__title}>
              Card number <span className={styles.formContainer__titleStar}>*</span>
            </span>
            <div className={styles.formContainer__input}>
              <div id='cardElement' />
            </div>
          </div>
        </div>
        <div className={styles.formContainer__wrapper}>
          <div className={styles.formContainer__inputBlock}>
            <span className={styles.formContainer__title}>
              Expiration date <span className={styles.formContainer__titleStar}>*</span>
            </span>
            <div className={styles.formContainer__input}>
              <div id='cardExpiry' />
            </div>
          </div>
          <div className={styles.formContainer__inputBlock}>
            <span className={styles.formContainer__title}>
              Security code <span className={styles.formContainer__titleStar}>*</span>
            </span>
            <div className={styles.formContainer__input}>
              <div id='cardCvc' />
            </div>
          </div>
        </div>
        <div className={styles.formContainer__wrapper}>
          <div className={styles.formContainer__inputBlock}>
            <span className={styles.formContainer__title}>
              First name <span className={styles.formContainer__titleStar}>*</span>
            </span>
            <div className={styles.formContainer__inputText}>
              <input type='text' name='firstName' />
            </div>
          </div>
        </div>
        <div className={styles.formContainer__wrapper}>
          <div className={styles.formContainer__inputBlock}>
            <span className={styles.formContainer__title}>
              Last name <span className={styles.formContainer__titleStar}>*</span>
            </span>
            <div className={styles.formContainer__inputText}>
              <input type='text' name='lastName' />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.formContainer__downBtnsBlock}>
        <div
          className={styles.formContainer__withDefaultContainer}
          onClick={() => setWithDefault(!withDefault)}
        >
          <div
            className={`${styles.formContainer__check} ${
              withDefault && styles.formContainer__check_active
            }`}
          >
            {withDefault && <Path />}
          </div>
          <div className={styles.formContainer__text}>Save as default</div>
        </div>
        {/*<button className={styles.formContainer__submitBtn} type='submit'>*/}
        {/*  Submit*/}
        {/*</button>*/}
      </div>
    </form>
  )
}

export default AddCardForm

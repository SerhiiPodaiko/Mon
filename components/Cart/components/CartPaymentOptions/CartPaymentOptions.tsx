'use client'
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useBrandStore } from '@store/index'
import { useElements, useStripe } from '@stripe/react-stripe-js'

import styles from './CartPaymentOptions.module.scss'

import CartAddCardForm from '@components/Cart/components/CartAddCardForm/CartAddCardForm'

import { createCard } from '@lib/api/Dashboard/brand/billing/createCard'
import { setDefaultCard } from '@lib/api/Dashboard/brand/billing/setDefaultCard'

import CardBlock from '@ui/DashBoard/Billing/CardBlock'

import SmallAddPaymentIcon from '@assets/BrandDashBoard/settings/icons/smallAddPayment.svg'
import CreditCardSVG from '@assets/Icons/card/credit-card.svg'

const CartPaymentOptions = () => {
  const [openCreditCard, setOpenCreditCard] = useState<boolean>(false)
  const [addCreditCard, setAddCreditCard] = useState<boolean>(false)
  // State for payment card
  const [selectedCard, setSelectedCard] = useState<string>('')
  const toastId = useRef(null)

  const cardsIsLoading = useBrandStore((state) => state.loadingCards)
  const cards = useBrandStore((state) => state.brandCards)
  const getBrandCards = useBrandStore((state) => state.getBrandCards)

  // const {
  //   data: cards,
  //   isLoading: cardsIsLoading
  //   // isRefetching: cardsIsRefetching, // if we need preloader
  //   // refetch: refetchCards
  // } = useQuery<Card[]>('brandCards', () => getCards(), {
  //   staleTime: Infinity
  // })

  const stripe = useStripe()
  const elements = useElements()

  const setDefaultCardHandler = (id: string) => {
    setSelectedCard(id)
  }

  useEffect(() => {
    getBrandCards()
  }, [])

  useEffect(() => {
    if (cards && !cardsIsLoading && cards.length > 0) {
      setSelectedCard(cards[0].id)
    } else if (cards && !cardsIsLoading && cards.length <= 0) {
      setAddCreditCard(true)
    }
  }, [cards, cardsIsLoading])

  // Function to handle form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>, withDefault: boolean) => {
    event.preventDefault()
    // Find name in the form event
    // @ts-ignore
    const { firstName, lastName } = event.target
    if (!firstName || !lastName || firstName.value === '' || lastName.value === '') {
      return toast.error('Please enter your first name & last name')
    }
    // Create token for the card
    // @ts-ignore
    const { error, token } = await stripe.createToken(elements?.getElement('cardNumber'), {
      name: `${firstName.value} ${lastName.value}`
    })

    // @ts-ignore
    toastId.current = toast.loading('Adding card...', { autoClose: false })

    if (error) {
      console.log('error', error)
    } else {
      createCard(token.id).then((res) => {
        setAddCreditCard(false)
        // @ts-ignore
        toast.update(toastId.current, {
          type: 'success',
          render: 'Card added successfully...'
        })
        // TODO: add logic to proceed checkout
        setTimeout(() => {
          // @ts-ignore
          toast.update(toastId.current, {
            type: 'success',
            render: 'Checkout success',
            isLoading: false,
            autoClose: 3000
          })
        }, 3000)
        // If checkbox is checked, set the card as default
        if (withDefault) {
          return setDefaultCard(res.id)
        }
        // Else just refetch the cards
        // refetchCards()
      })
    }
  }

  return (
    <div className={styles.payment}>
      <h3 className={styles.payment__title}>Payment options</h3>
      <div className={styles.payment__methods}>
        <div
          className={`${styles.payment__methodsCreditCard} ${
            openCreditCard ? styles.payment__methodsCreditCardActive : ''
          }`}
        >
          <div
            className={styles.payment__methodsCreditCardTitle}
            onClick={() => setOpenCreditCard(!openCreditCard)}
          >
            <span>Credit & Debit Cards </span>
            <CreditCardSVG />
          </div>

          <div
            className={`${styles.payment__methodsCreditCardCollapse} ${
              openCreditCard ? styles.payment__methodsCreditCardCollapseActive : ''
            }`}
          >
            {/* Card List */}
            {cards && cards.length > 0 && (
              <div className={styles.cardBlock}>
                {/*{cardsIsLoading || cardsIsRefetching ? (*/}
                {/*  <Preloader />*/}
                {/*) : (*/}
                {/*//   code*/}
                {/*)}*/}

                {cards.map((card) => (
                  <CardBlock
                    key={card.id}
                    id={card.id}
                    lastNums={card.last4}
                    type={card.brand}
                    isDefault={selectedCard === card.id}
                    onSetDefault={(id) => setDefaultCardHandler(id)}
                    onDeleteCard={(id) => console.log(`Deleting card with id ${id}`)}
                  />
                ))}
              </div>
            )}
            {/* Add card form */}
            <div
              className={styles.addCardBtnWrapper}
              onClick={() => setAddCreditCard(!addCreditCard)}
            >
              <SmallAddPaymentIcon />
              <span>New</span>
            </div>
            {addCreditCard && (
              <div className={styles.addCardBlock}>
                {/* TODO: Add handle payment */}
                <CartAddCardForm
                  stripe={stripe}
                  elements={elements}
                  handleSubmit={handleSubmit}
                  withoutSubmit={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPaymentOptions

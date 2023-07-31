'use client'
import { useContext } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useMediaQuery } from 'react-responsive'

import styles from './Cart.module.scss'

import CartSummary from '@components/Cart/components/CartSummary/CartSummary'

import Alert from '@ui/Alert/Alert'
import Preloader from '@ui/Preloader/Preloader'

import { CartContext } from '@context/Cart/CartContext'

import useRootStore from '../../store/RootStore'

import PrevArrowImage from '@assets/Icons/arrows/prev-black.svg'
import ConfigurationSVG from '@assets/Images/cart/configuration.svg'
import ConfirmPaySVG from '@assets/Images/cart/confirm-pay.svg'
import ManageSVG from '@assets/Images/cart/manage.svg'
import NextArrowSVG from '@assets/Images/cart/next-arrow.svg'
import StepSVG from '@assets/Images/cart/step.svg'

const Cart = () => {
  const { cartStore } = useRootStore()
  const { renderStep } = useContext(CartContext)
  const router = useRouter()
  const pathname = usePathname()
  const isMobile = useMediaQuery({ maxWidth: 767 })

  const backToStep = (): void => {
    if (cartStore.step === 1) {
      router.back()
    } else {
      cartStore.changeStep(cartStore.step - 1)
    }
  }

  if (pathname === 'cart') {
    cartStore.changeStep(1)
  }

  return (
    <section className={styles.cart}>
      <Alert />
      <header className={styles.cart__header}>
        {isMobile ? null : (
          <div className={styles.cart__headerBtnBack} onClick={backToStep}>
            <PrevArrowImage />
            <span>Back</span>
          </div>
        )}
        <div className={styles.cart__headerSteps}>
          {(!isMobile || cartStore.step === 1) && (
            <div
              className={`${styles.cart__headerStep} ${
                cartStore.step === 1 && styles.cart__headerStepActive
              } ${cartStore.step > 1 && styles.cart__headerStepDone}`}
            >
              <ConfigurationSVG />
              <div className={styles.cart__headerStepWrapper}>
                {isMobile && cartStore.step === 1 ? <span>Step {cartStore.step}</span> : null}
                <span>Cart configuration</span>
              </div>
            </div>
          )}
          {!isMobile && <NextArrowSVG className={styles.cart__headerStepArrowIcon} />}

          {(!isMobile || cartStore.step === 2) && (
            <div
              className={`${styles.cart__headerStep} ${
                cartStore.step === 2 && styles.cart__headerStepActive
              } ${cartStore.step > 2 && styles.cart__headerStepDone}`}
            >
              <ManageSVG />
              <div className={styles.cart__headerStepWrapper}>
                {isMobile && cartStore.step === 2 ? <span>Step {cartStore.step}</span> : null}
                <span>Manage Campaigns</span>
              </div>
            </div>
          )}
          {!isMobile && <NextArrowSVG className={styles.cart__headerStepArrowIcon} />}

          {(!isMobile || cartStore.step === 3) && (
            <div
              className={`${styles.cart__headerStep} ${
                cartStore.step === 3 && styles.cart__headerStepActive
              } ${cartStore.step > 3 && styles.cart__headerStepDone}`}
            >
              <StepSVG />
              <div className={styles.cart__headerStepWrapper}>
                {isMobile && cartStore.step === 3 ? <span>Step {cartStore.step}</span> : null}
                <span>Campaign brief</span>
              </div>
            </div>
          )}
          {!isMobile && <NextArrowSVG className={styles.cart__headerStepArrowIcon} />}

          {(!isMobile || cartStore.step === 4) && (
            <div
              className={`${styles.cart__headerStep} ${
                cartStore.step === 4 && styles.cart__headerStepActive
              }`}
            >
              <ConfirmPaySVG />
              <div className={styles.cart__headerStepWrapper}>
                {isMobile && cartStore.step === 4 ? <span>Step {cartStore.step}</span> : null}
                <span onClick={() => cartStore.changeStep(4)}>Confirm & Pay</span>
              </div>
            </div>
          )}
        </div>
      </header>
      <div
        className={`${styles.cart__content} ${cartStore.step === 3 && styles.cart__contentFull}`}
      >
        {!cartStore.cartData ? <Preloader /> : renderStep()}
        {cartStore.step === 3 ? null : <CartSummary />}
      </div>
    </section>
  )
}

export default Cart

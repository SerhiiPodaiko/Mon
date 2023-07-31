'use client'
import { useContext, useState } from 'react'
import Link from 'next/link'
import { getCookie } from 'cookies-next'
import { useMutation } from 'react-query'
import { useMediaQuery } from 'react-responsive'
import { toast } from 'react-toastify'
import useRootStore from '@store/RootStore'

import styles from './CartSummary.module.scss'

import { PAGE_SLUGS } from '@constants/pages'

import { fetchUpdateCampaignCart } from '@lib/api/Cart'

import ClassicModal from '@ui/Modals/classicModal/ClassicModal'

import { CartContext } from '@context/Cart/CartContext'

import ArrowToggleTabletSVG from '@assets/Icons/arrows/arrow-down-cart.svg'
// import ErrorSVG from '@assets/Icons/card/error.svg'
// import SuccessPaymentSVG from '@assets/Icons/card/success-card.svg'
import SecurePaymentSVG from '@assets/Icons/secure-payment.svg'
import LoginSVG from '@assets/Images/verification.svg'

const CartSummary = () => {
  const [modal, setModal] = useState<boolean>(false)
  // const [statusPaymentModal, setStatusPaymentModal] = useState<boolean>(false)
  // const [isFlagModal, setIsFlagModal] = useState<string>('')
  const [tabletDropdown, setTabletDropdown] = useState<boolean>(false)

  // const createInvoicesCheckoutMutation = useMutation(fetchCreateInvoicesCheckout, {
  //   onSuccess: () => {
  //     setStatusPaymentModal(true)
  //   },
  //   onError: () => {
  //     setStatusPaymentModal(true)
  //   }
  // })
  const updateCampaignCartMutation = useMutation(fetchUpdateCampaignCart)
  const { watch, errors, paymentFormRef, campaignDataObject } = useContext(CartContext)
  const { cartStore } = useRootStore()
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const isTablet = useMediaQuery({ maxWidth: 992 })

  const summary = Object.values(cartStore?.cartData || [])
    ?.map((item: any) => item?.invoiceItemModel)
    ?.reduce(
      (accumulator: any, currentValue: any) => {
        accumulator.total += currentValue?.invoice_item_subtotal
        accumulator.fee += currentValue?.invoice_item_fee
        accumulator.positions++
        return accumulator
      },
      { total: 0, fee: 0, positions: 0 }
    )
  summary.rightHoldersCount = cartStore.cartData?.reduce((unique: any, item: any) => {
    unique.add(item?.invoiceId)
    return unique
  }, new Set()).size

  const handlePayment = (event: any) => {
    event.preventDefault()

    if (!getCookie('Role')) {
      setModal(true)
      return
    }

    if (cartStore.step === 2) {
      updateCampaignCartMutation.mutate({ campaign: campaignDataObject.campaign })
    }

    if (updateCampaignCartMutation.error) {
      toast.error('Something went wrong, please try again later')
    }

    if (cartStore.step === 4) {
      if (paymentFormRef?.current) {
        paymentFormRef?.current?.requestSubmit()
      }
      return
    }

    cartStore.changeStep(cartStore.step + 1)
  }

  return (
    <div className={styles.summary}>
      <div
        className={`${styles.summary__inner} ${tabletDropdown ? styles.summary__innerActive : ''}`}
      >
        {isTablet && (
          <ArrowToggleTabletSVG
            onClick={() => setTabletDropdown(!tabletDropdown)}
            className={`${styles.summary__toggleArrow} ${
              tabletDropdown ? styles.summary__toggleArrowActive : ''
            }`}
          />
        )}
        {tabletDropdown ? <h4 className={styles.summary__title}>Campaign summary</h4> : null}
        {isTablet ? (
          tabletDropdown ? (
            <div className={styles.summary__content}>
              <ul className={styles.summary__list}>
                <li className={styles.summary__listItem}>
                  <span className={styles.summary__listItemTitle}>Right holders:</span>
                  <span className={styles.summary__listItemCount}>
                    {summary?.rightHoldersCount}
                  </span>
                </li>
                <li className={styles.summary__listItem}>
                  <span className={styles.summary__listItemTitle}>Positions:</span>
                  <span className={styles.summary__listItemCount}>{summary?.positions}</span>
                </li>
                <li className={styles.summary__listItem}>
                  <span className={styles.summary__listItemTitle}>MONETISEUR FEE:</span>
                  <span className={styles.summary__listItemCount}>
                    {summary && Number(summary.fee).toFixed(2)}
                  </span>
                </li>
              </ul>
            </div>
          ) : null
        ) : (
          <div className={styles.summary__content}>
            <ul className={styles.summary__list}>
              <li className={styles.summary__listItem}>
                <span className={styles.summary__listItemTitle}>Right holders:</span>
                <span className={styles.summary__listItemCount}>{summary?.rightHoldersCount}</span>
              </li>
              <li className={styles.summary__listItem}>
                <span className={styles.summary__listItemTitle}>Positions:</span>
                <span className={styles.summary__listItemCount}>{summary?.positions}</span>
              </li>
              <li className={styles.summary__listItem}>
                <span className={styles.summary__listItemTitle}>MONETISEUR FEE:</span>
                <span className={styles.summary__listItemCount}>
                  {summary && Number(summary.fee).toFixed(2)}
                </span>
              </li>
            </ul>
          </div>
        )}
        <div className={styles.summary__totalWrapper}>
          <span>TOTAL:</span>
          <span className={styles.summary__totalWrapperResults}>
            {summary && Number(summary.total).toFixed(2) + ' €'}
          </span>
        </div>
      </div>
      <div className={styles.summary__btnWrapper}>
        <button
          className={styles.summary__btn}
          disabled={
            cartStore.step === 1
              ? false
              : !watch('campaign_name') ||
                !watch('campaign_description') ||
                !watch('campaign_start_date') ||
                !watch('campaign_end_date') ||
                !watch('campaign_service_reference') ||
                errors.campaign_name ||
                errors.campaign_description ||
                errors.campaign_start_date ||
                errors.campaign_end_date
          }
          onClick={handlePayment}
        >
          {cartStore.step === 4
            ? 'Purchase'
            : isTablet && cartStore.step === 2
            ? 'apply'
            : 'Continue'}
        </button>
      </div>
      {/*{createInvoicesCheckoutMutation.isError && (*/}
      {/*  <div>There was an error providing purchase. Please contact our support</div>*/}
      {/*)}*/}
      {'true' ? (
        tabletDropdown ? (
          <>
            <p className={styles.summary__security}>
              <SecurePaymentSVG />
              <span>SSL secure payment</span>
            </p>
            <p className={styles.summary__info}>
              You will be charged € {cartStore.cartData?.summary?.total}. Total amount includes
              currency conversion fees.
            </p>
          </>
        ) : null
      ) : null}

      {isTablet && <div className={styles.summary__line}></div>}

      <ClassicModal withCloseBtn={false} onClose={() => setModal(false)} modal={modal}>
        <div className={styles.modal}>
          <LoginSVG />
          <p className={styles.modalMessage}>
            To complete the order you need to {isTablet && <br />} log in to your account.
          </p>
          <div className={styles.modalLinksWrapper}>
            <Link href={PAGE_SLUGS.login} className={styles.modalLink}>
              Log in
            </Link>
            <Link href={PAGE_SLUGS.register} className={styles.modalLink}>
              {isMobile ? 'Sign Up' : 'Create account'}
            </Link>
          </div>
        </div>
      </ClassicModal>

      {/*<ClassicModal*/}
      {/*  withCloseBtn={false}*/}
      {/*  onClose={() => setStatusPaymentModal(false)}*/}
      {/*  modal={statusPaymentModal}*/}
      {/*>*/}
      {/*  <div className={styles.modal}>*/}
      {/*    {isFlagModal === 'success' ? (*/}
      {/*      <SuccessPaymentSVG />*/}
      {/*    ) : (*/}
      {/*      <ErrorSVG onClick={() => setStatusPaymentModal(false)} />*/}
      {/*    )}*/}
      {/*    {isFlagModal === 'success' ? (*/}
      {/*      <p className={styles.modalMessage}>We let you know when athlete accepts the deal.</p>*/}
      {/*    ) : (*/}
      {/*      <div className={styles.modalMessageWrapper}>*/}
      {/*        <h3 className={styles.modalMessageTitle}>Payment failed</h3>*/}
      {/*        <p className={styles.modalMessage}>*/}
      {/*          Please Try A Different <br /> Payment Method*/}
      {/*        </p>*/}
      {/*      </div>*/}
      {/*    )}*/}
      {/*    {isFlagModal === 'success' ? (*/}
      {/*      <div className={styles.modalLinksWrapper}>*/}
      {/*        <Link href={PAGE_SLUGS.marketplace} className={styles.modalLink}>*/}
      {/*          Manage campaigns*/}
      {/*        </Link>*/}
      {/*      </div>*/}
      {/*    ) : null}*/}
      {/*  </div>*/}
      {/*</ClassicModal>*/}
    </div>
  )
}

export default CartSummary

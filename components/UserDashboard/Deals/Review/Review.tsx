import { useState } from 'react'
import Image from 'next/image'

import styles from './Review.module.scss'

import { confirmDeal } from '@lib/api/Dashboard/RightsHolder/user/deals/confirmDeal'

import ClassicModal from '@ui/Modals/classicModal/ClassicModal'

import CloseBtn from '@assets/Icons/closeBtn.svg'
import Clock from '@assets/UserDashboard/deals/icons/clock.svg'
import noAvatar from '@assets/UserDashboard/toolbox/images/image6.jpg'

type Props = {
  name: string
  date: string
  id: string
  revalidate: any
  refetchInvoices: any
  logo_link: string
  product: Product
}

type Product = {
  name: string
  category: string
  icon: string
  quantity: number
  price: number
}

const Review = ({ name, date, id, revalidate, refetchInvoices, logo_link, product }: Props) => {
  const [modalIsOpen, setIsOpenModal] = useState(false)

  // Confirm the deal as accepted and trigger revalidation and refetching
  const acceptDeal = () => {
    // Confirm the deal as accepted and trigger revalidation and refetching
    confirmDeal(id, true).then(() => {
      revalidate()
      refetchInvoices()
    })
    console.log('Accepted')
  }

  // Confirm the deal as rejected and trigger revalidation and refetching
  const rejectDeal = () => {
    console.log('Rejected')
    confirmDeal(id, false).then(() => {
      revalidate()
      refetchInvoices()
    })
  }

  // Formatting date data
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const today = new Date()
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    const hour = date.getHours()
    const minute = date.getMinutes()
    const month = date.toLocaleString('default', { month: 'long' })
    const day = date.getDate()
    const year = date.getFullYear()

    if (date.toDateString() === today.toDateString()) {
      const time = `${hour % 12 || 12}:${minute.toString().padStart(2, '0')} ${
        hour < 12 ? 'AM' : 'PM'
      }`
      return `Today at ${time}`
    } else if (date.toDateString() === yesterday.toDateString()) {
      const time = `${hour % 12 || 12}:${minute.toString().padStart(2, '0')} ${
        hour < 12 ? 'AM' : 'PM'
      }`
      return `Yesterday at ${time}`
    } else {
      const time = `${hour % 12 || 12}:${minute.toString().padStart(2, '0')} ${
        hour < 12 ? 'AM' : 'PM'
      }`
      return `${month} ${day} ${year} at ${time}`
    }
  }

  return (
    <>
      {/* Modal for reviewing the partnership proposal */}
      <ClassicModal
        withCloseBtn={false}
        onClose={() => setIsOpenModal(!modalIsOpen)}
        modal={modalIsOpen}
      >
        <div className={styles.reviewModal}>
          <div className={styles.reviewModal__closeBlock}>
            <CloseBtn
              onClick={() => setIsOpenModal(!modalIsOpen)}
              className={styles.reviewModal__closeImg}
            />
          </div>
          <div className={styles.reviewModal__mainBlock}>
            <div className={styles.reviewModal__brandBlock}>
              <div className={styles.reviewModal__brandImgBlock}>
                {/* Render the logo of the brand */}
                {logo_link ? (
                  <img
                    loading='lazy'
                    className={styles.reviewModal__brandImg}
                    src={logo_link}
                    alt={'Logo'}
                  />
                ) : (
                  <Image
                    className={styles.reviewModal__brandImg}
                    src={noAvatar}
                    alt={'noAvatar'}
                    fill
                  />
                )}
              </div>
              <div className={styles.reviewModal__brandTextBlock}>
                {/* Display the name of the brand */}
                <span className={styles.reviewModal__brandName}>{name}</span>
              </div>
            </div>
            <div className={styles.reviewModal__subtitleBlock}>
              <span className={styles.reviewModal__subtitleDate}>{formatDate(date)}</span>
              <Clock className={styles.reviewModal__subtitleClock} />
              <span className={styles.reviewModal__subtitleReplySpan}>24 hours to reply</span>
            </div>
            <span className={styles.reviewModal__title}>
              {name} has sent you a partnership proposal.
            </span>
            <div className={styles.reviewModal__productsBlock}>
              <div className={styles.reviewModal__products}>
                <div className={styles.reviewModal__product}>
                  <div className={styles.reviewModal__productLeftBlock}>
                    <div className={styles.reviewModal__productImgBlock}>
                      {/* Render the icon/image of the product */}
                      <img
                        className={styles.reviewModal__productImg}
                        src={product.icon || ''}
                        alt={product.name}
                        width={50}
                        height={50}
                      />
                    </div>
                    <div className={styles.reviewModal__productTextBlock}>
                      <div className={styles.reviewModal__productCategory}>{product.category}</div>
                      <div className={styles.reviewModal__productName}>{product.name}</div>
                    </div>
                  </div>
                  <div className={styles.reviewModal__productRightBlock}>
                    <div className={styles.reviewModal__productQuantity}>{product.quantity}</div>
                    <div className={styles.reviewModal__productPrice}>{product.price}€</div>
                  </div>
                </div>
                <div className={styles.reviewModal__productsSummary}>
                  {/* Display the summary of the products */}
                  <div className={styles.reviewModal__productQuantity}>{product.quantity}</div>
                  <div className={styles.reviewModal__productPrice}>{product.price}€</div>
                </div>
              </div>
            </div>
            <div className={styles.reviewModal__btnsBlock}>
              {/* Button to reject the proposal */}
              <div onClick={rejectDeal} className={styles.reviewModal__btn}>
                Reject
              </div>

              {/* Button to accept the proposal */}
              <div
                onClick={acceptDeal}
                className={`${styles.reviewModal__btn} ${styles.reviewModal__btn_active}`}
              >
                Accept
              </div>
            </div>
          </div>
        </div>
      </ClassicModal>

      {/* Review card */}
      <div className={styles.review}>
        <div className={styles.review__leftBlock}>
          <div className={styles.review__logoBlock}>
            {/* Render the logo of the brand */}
            {logo_link ? (
              <img loading='lazy' className={styles.review__logo} src={logo_link} alt={'Logo'} />
            ) : (
              <Image
                className={styles.review__logo}
                src={noAvatar}
                alt={'noAvatar'}
                width={50}
                height={50}
              />
            )}
          </div>
          <div className={styles.review__textBlock}>
            {/* Display the title and additional information */}
            <span className={styles.review__title}>
              {name} has sent you a partnership proposal.
            </span>
            <div className={styles.review__textBlockBotton}>
              <span className={styles.review__span}>{formatDate(date)}</span>
              <Clock className={styles.review__clock} />
              <span className={styles.review__span}>24 hours to reply</span>
            </div>
          </div>
        </div>
        <div className={styles.review__rightBlock}>
          {/* Button to view the details of the proposal */}
          <button
            className={styles.review__rightBlockBtn}
            onClick={() => setIsOpenModal(!modalIsOpen)}
          >
            View details
          </button>
        </div>
      </div>
    </>
  )
}

export default Review

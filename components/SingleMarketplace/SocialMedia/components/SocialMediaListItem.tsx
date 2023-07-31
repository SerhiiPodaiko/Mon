'use client'
import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCookie } from 'cookies-next'
import { motion } from 'framer-motion'
import Skeleton from 'react-loading-skeleton'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import styles from '../SocialMedia.module.scss'

import Modal from '@components/SingleMarketplace/Modal/Modal'

import { PAGE_SLUGS } from '@constants/pages'

import { fetchUpdateInvoiceCart } from '@lib/api/Cart/Invoices/fetchUpdateInvoiceCart'

import Alert from '@ui/Alert/Alert'

import ArrowDown from '@assets/Icons/arrows/arrow-down-small.svg'

type SocialMediaListItemProps = {
  item: any
}

const SocialMediaListItem: FC<SocialMediaListItemProps> = ({ item }) => {
  const [productId, setProductId] = useState<string>('')
  const [productTitle, setProductTitle] = useState<string>('')
  const [quantity, setQuantity] = useState<number>(0)
  const [options, setOptions] = useState<any>([])
  const [itemCost, setItemCost] = useState<any>(1)
  const [modalImg, setModalImg] = useState<any>(null)
  const [totalPrice, setTotalPrice] = useState<any>(null)
  const [isRole, setIsRole] = useState<boolean>(false)
  const [modal, setModal] = useState(false)
  const router = useRouter()
  const addToCartProductMutation = useMutation(fetchUpdateInvoiceCart)
  const clearAllPrice = () => {
    setQuantity(1)
    setTotalPrice(itemCost)
  }

  const addToCart = () => {
    addToCartProductMutation.mutate({
      invoice_item_product_id: productId,
      invoice_item_quantity: quantity,
      invoice_item_replace_quantity: true
    })
  }

  const preViewToCart = (item: any) => {
    if (getCookie('Role') !== 'Brand' || getCookie('Role') !== 'brand') {
      setIsRole(false)
    } else {
      setIsRole(true)
    }

    setModal(true)
    setProductTitle(item?.title)
    setProductId(item?.id)
    setItemCost(item?.price)
    setModalImg(item?.imgLink)
    setQuantity(1)
    setOptions(Array.from({ length: item?.availableCount }, (_, i) => i + 1))
  }

  const closeModal = () => {
    setModal(false)
    setQuantity(0)
  }

  useEffect(() => {
    if (addToCartProductMutation.isSuccess) {
      router.push(PAGE_SLUGS.cart)
    }
    if (addToCartProductMutation.isError) {
      toast.error('The token is rotten. Sign in again')
    }
  }, [addToCartProductMutation.isSuccess, addToCartProductMutation.isError])

  useEffect(() => {
    setTotalPrice(itemCost * quantity)
  }, [itemCost, quantity])

  console.log('item', item)

  return (
    <>
      {item ? (
        <motion.div
          layout
          onClick={() => preViewToCart(item)}
          className={styles.socialMedia__sliderItem}
        >
          <div className={styles.socialMedia__sliderImg}>
            {item?.imgLink ? <img src={item?.imgLink} alt='Media' /> : <Skeleton />}
          </div>
          <div className={styles.socialMedia__sliderInfo}>
            {/*<p className={styles.socialMedia__sliderInfoCollection}>Collection name</p>*/}
            <h4 className={styles.socialMedia__sliderInfoTitle}>
              {`${item?.title?.length > 20 ? item?.title?.slice(0, 20) + `...` : item?.title}`}
            </h4>
            <div className={styles.socialMedia__sliderInfoWrapper}>
              <div className={styles.socialMedia__sliderInfoWrapperBlock}>
                <span>{item?.price} €</span>
                <span>Item cost</span>
              </div>
              <div className={styles.socialMedia__sliderInfoWrapperLine}></div>
              <div className={styles.socialMedia__sliderInfoWrapperBlock}>
                <span>{item?.availableCount}</span>
                <span>Available</span>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <Skeleton />
      )}

      {modal && (
        <Modal onClose={closeModal} modal={modal}>
          <Alert />
          <div className={styles.modal}>
            <div className={styles.modal__socialWrapper}>
              <div className={styles.modal__previewImage}>
                {modalImg ? <img alt='Preview image to cart' src={item?.imgLink} /> : <Skeleton />}
              </div>
              <div className={styles.modal__socialLinksWrapper}>
                <button type='button' className={styles.modal__socialLink}>
                  <span>{item?.categoryName}</span>
                </button>
              </div>
            </div>
            <div className={styles.modal__info}>
              <div className={styles.modal__post}>
                <div className={styles.modal__postHead}>
                  <h4 className={styles.modal__postTitle}>
                    {productTitle ? productTitle : 'Social media post'}
                  </h4>
                  <p className={styles.modal__postSubtitle}>
                    This position includes the mention of partners in social media channels to
                    attract new people to brand’s page.
                  </p>
                </div>
              </div>
              <div className={styles.modal__results}>
                <h4 className={styles.modal__resultsTitle}>Potential results</h4>
                <div className={styles.modal__resultsPotential}>
                  <div className={styles.modal__resultsPotentialBlock}>
                    <span>23%</span>
                    <span className={styles.modal__resultsPotentialBlockText}>
                      Eng. <br />
                      rate
                    </span>
                  </div>
                  <div className={styles.modal__resultsPotentialBlock}>
                    <span>674k</span>
                    <span className={styles.modal__resultsPotentialBlockText}>
                      Media <br />
                      reach
                    </span>
                  </div>
                  <div className={styles.modal__resultsPotentialBlock}>
                    <span>65k</span>
                    <span className={styles.modal__resultsPotentialBlockText}>
                      average <br />
                      likes
                    </span>
                  </div>
                </div>
                <div className={styles.modal__resultsWrapper}>
                  <div className={styles.modal__resultsCost}>
                    <span>Item cost:</span>
                    <span>&nbsp; {itemCost} €</span>
                  </div>
                  <div className={styles.modal__quantity}>
                    <h4 className={styles.modal__quantityTitle}>Enter Quantity</h4>
                    <motion.select
                      layout
                      onChange={(e: any) => setQuantity(e.target.value)}
                      value={quantity}
                      className={styles.modal__quantitySelect}
                    >
                      {options.map((option: any) => (
                        <motion.option
                          layout
                          key={option}
                          value={option}
                          className={styles.modal__quantitySelectOption}
                        >
                          {option}
                        </motion.option>
                      ))}
                    </motion.select>
                    <ArrowDown className={styles.modal__quantitySelectArrow} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className={styles.modal__footer}>
            <button type='button' className={styles.modal__footerClearBtn} onClick={clearAllPrice}>
              Clear all
            </button>
            <div className={styles.modal__footerTotalPrice}>
              <div className={styles.modal__footerTotalPriceWrapper}>
                <span>Total:</span>
                <span>{totalPrice} €</span>
              </div>
              {isRole ? (
                <button
                  type='button'
                  className={styles.modal__footerAddToCartBtn}
                  onClick={addToCart}
                >
                  Add to cart
                </button>
              ) : null}
            </div>
          </footer>
        </Modal>
      )}
      <Alert />
    </>
  )
}

export default SocialMediaListItem

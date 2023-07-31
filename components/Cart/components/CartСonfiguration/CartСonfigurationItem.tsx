import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import useRootStore from '@store/RootStore'

import styles from './CartConfiguration.module.scss'

import { fetchDeleteInvoiceCart, fetchUpdateInvoiceCart } from '@lib/api/Cart'

import MinusSVG from '@assets/Icons/minus-dark-blue.svg'
import PlusSVG from '@assets/Icons/plus-dark-blue.svg'
import RemoveSVG from '@assets/Icons/remove.svg'

const CartConfigurationItem = ({ item }: { item: any }) => {
  const [counter, setCounter] = useState<number>(item?.invoiceItemModel?.invoice_item_quantity)

  const queryClient = useQueryClient()
  const { cartStore } = useRootStore()
  const updateInvoiceCartMutation = useMutation(fetchUpdateInvoiceCart)

  const updateInvoiceCart = (productId: string, quantity: number) => {
    updateInvoiceCartMutation.mutate(
      {
        invoice_item_product_id: productId,
        invoice_item_quantity: quantity,
        invoice_item_replace_quantity: true
      },
      {
        onSuccess: (data: any) => {
          const newProducts = cartStore.cartData?.map((item: any) => {
            if (item?.productId === productId) {
              item.invoiceItemModel = data?.invoice_item
            }
            return item
          })
          cartStore.setCartData(newProducts)
        }
      }
    )
  }
  const deleteProductCartMutation = useMutation(fetchDeleteInvoiceCart, {
    onSuccess: () => {
      queryClient.invalidateQueries('getAllInvoiceDetails')
    }
  })

  const deleteProductCart = (productId: string) => {
    deleteProductCartMutation.mutate(
      { invoice_item_product_id: productId },
      {
        onSuccess: () => {
          const newProducts = cartStore.cartData?.filter(
            (prod: any) => item?.invoiceProductId !== prod?.productId
          )
          cartStore.setCartData(newProducts)
        }
      }
    )
  }

  const onDeleteProduct = (productId: string): void => {
    deleteProductCart(productId)
  }

  const onChangeCounter = (ct: number) => {
    setCounter((prev) => prev + ct)
    updateInvoiceCart(item?.invoiceProductId, counter + ct)
  }

  return (
    <div className={styles.configuration__productInfoWrapper}>
      <span className={styles.configuration__productInfoWrapperCategory}>{item?.category}</span>
      <div className={styles.configuration__productInfoWrapperPrices}>
        <span>{item?.price * counter} €</span>
        <span>{item?.price} €</span>
        <div className={styles.configuration__productInfoWrapperCounter}>
          <button
            disabled={counter === item?.availableCount}
            className={styles.configuration__productInfoWrapperCounterBtn}
            onClick={() => onChangeCounter(+1)}
          >
            <PlusSVG />
          </button>
          <span className={styles.configuration__productInfoWrapperCounterTotal}>{counter}</span>
          <button
            disabled={counter === 0}
            className={styles.configuration__productInfoWrapperCounterBtn}
            onClick={() => onChangeCounter(-1)}
          >
            <MinusSVG />
          </button>
        </div>
        <button
          className={styles.configuration__dropdownRemove}
          onClick={() => onDeleteProduct(item?.invoiceProductId)}
        >
          <RemoveSVG />
        </button>
      </div>
    </div>
  )
}

export default CartConfigurationItem

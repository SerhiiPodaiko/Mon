import { useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import useRootStore from '@store/RootStore'

import styles from './CartConfiguration.module.scss'

import {
  fetchDeleteAllInvoicesCart,
  fetchGetAllInvoicesCart,
  fetchGetInvoicesDetailsCart
} from '@lib/api/Cart'

import Preloader from '@ui/Preloader/Preloader'

import CartConfigurationInvoiceGroup from './CartConfigurationInvoiceGroup'

const CartConfigurationList = () => {
  const { cartStore } = useRootStore()
  const queryClient = useQueryClient()

  const getDetailsProductMutation = useMutation(fetchGetInvoicesDetailsCart)

  const getAllInvoiceDetails = useMutation(
    'getAllInvoiceDetails',
    () => fetchGetAllInvoicesCart(),
    {
      onSuccess: (data) => {
        const groupedInvoices = data?.items?.reduce((group: any, item: any) => {
          const invoiceId = item?.invoice?.invoice_id
          group[invoiceId] = group[invoiceId] ?? {}
          group[invoiceId] = {
            invoiceId: item?.invoice?.invoice_id,
            rightHolderId: item?.right_holder?.rights_holder_sub,
            invoiceBrand_logoLink: item?.invoice?.brand_repr?.brand?.logo_link,
            imgLink: item?.right_holder?.link,
            firstName: item?.right_holder?.first_name,
            lastName: item?.right_holder?.last_name,
            title: item?.right_holder?.kind_of_sport?.name
          }
          return group
        }, {})

        const invoiceArray = Object.keys(groupedInvoices).map((key) => ({
          invoice_id: { eq: key }
        }))

        console.log('INVOICE', data)
        console.log('invoiceArray', invoiceArray)

        getDetailsProductMutation.mutate(
          {
            order_by: ['price desc', 'name asc'],
            where: {
              or: invoiceArray
            },
            with_count: true
          },
          {
            onSuccess: (data) => {
              const products: any = data?.items?.map((item: any) => {
                const invoiceId = item?.InvoiceItemModel?.invoice_invoice_id
                return {
                  invoiceId,
                  invoiceProductId: item?.InvoiceItemModel?.invoice_item_product_id,

                  invoiceDetails: groupedInvoices[invoiceId],
                  productImg: groupedInvoices[invoiceId]?.invoiceBrand_logoLink,

                  availableCount: item?.ProductModel?.product_available_count,
                  price: item?.ProductModel?.product_price,
                  productId: item?.ProductModel?.product_id,

                  productName: item?.ProductCategoryGroupModel?.product_category_group_name,
                  platformName: item?.ProductCategoryPlatformModel?.product_category_platform_name,
                  platformId: item?.ProductCategoryPlatformModel?.product_category_platform_id,

                  category: item?.ProductCategoryModel?.product_category_name,
                  categoryId: item?.ProductCategoryModel?.product_category_id,

                  invoiceItemModel: item?.InvoiceItemModel
                }
              })
              cartStore.setCartData(products)
            }
          }
        )
      }
    }
  )

  const deleteAllProductsCartMutation = useMutation(fetchDeleteAllInvoicesCart, {
    onSuccess: () => {
      cartStore.setCartData([])
      queryClient.invalidateQueries('getAllInvoiceDetails')
    }
  })

  const deleteAllProductsCart = () => {
    deleteAllProductsCartMutation.mutate([])
  }

  useEffect(() => {
    getAllInvoiceDetails.mutate()
  }, [])

  const groupedInvoices = cartStore.cartData?.reduce((group: any, item: any) => {
    group[item?.invoiceId] = group[item?.invoiceId] ?? []
    group[item?.invoiceId].push(item)
    return group
  }, {})

  return (
    <div className={styles.configuration}>
      <header className={styles.configuration__header}>
        <h3 className={styles.configuration__title}>Check Item details</h3>
        {cartStore.step === 1 && (
          <button
            disabled={!cartStore.cartData?.length}
            className={styles.configuration__btnClear}
            onClick={deleteAllProductsCart}
          >
            Clear All
          </button>
        )}
      </header>
      {!cartStore.cartData ? (
        getAllInvoiceDetails.isLoading ? (
          <Preloader />
        ) : (
          <div className={styles.configuration__alert}>Your basket is empty</div>
        )
      ) : (
        Object.keys(groupedInvoices)?.map((key: string) => (
          <CartConfigurationInvoiceGroup key={key} invoiceGroup={groupedInvoices[key]} />
        ))
      )}
    </div>
  )
}

export default CartConfigurationList

'use client'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'

import styles from './Deals.module.scss'

import Pagination from '@components/UserDashboard/Deals/Pagination/Pagination'
import Review from '@components/UserDashboard/Deals/Review/Review'
import TableOptions from '@components/UserDashboard/Deals/TableOptions/TableOptions'
import TableTitle from '@components/UserDashboard/Deals/TableTitle/TableTitle'
import Title from '@components/UserDashboard/Deals/Title/Title'
import TopCards from '@components/UserDashboard/Deals/TopCards/TopCards'

import { getAcceptDeals } from '@lib/api/Dashboard/RightsHolder/user/deals/getAcceptDeals'
import { getDeals } from '@lib/api/Dashboard/RightsHolder/user/deals/getDeals'

import Preloader from '@ui/Preloader/Preloader'

export type MappedData = {
  brandPK: string
  brandName: string
  brandImg: string
  items: {
    name: string
    category: string
    status: string
    quantity: number
    budget: number
    icon: string
    created: string
  }[]
}

const Deals = ({ page }: { page: string }) => {
  // Fetch accept deals data
  const { data, isLoading, refetch } = useQuery('invoicesAccept', () => getAcceptDeals(), {
    staleTime: Infinity
  })

  // Fetch deals data
  const { data: invoices, refetch: refetchInvoices } = useQuery('invoices', () => getDeals(), {
    staleTime: Infinity
  })

  useEffect(() => {
    refetch()
    refetchInvoices()
  }, [])

  const mappedData: MappedData[] = []

  if (!invoices) {
    return <Preloader />
  }

  // Map and organize data into MappedData array
  for (const item of invoices.items) {
    const brand = mappedData.find((el) => el.brandPK === item.brand.sub)
    if (brand) {
      brand.items.push({
        budget: item.invoice.subtotal,
        category: item.product_category_platform.product_category_platform_name,
        icon: item.product_category.product_category_picture_link || '',
        name: item.product_category.product_category_name,
        quantity: item.invoice.quantity,
        status: item.invoice.invoice_status,
        created: item.invoice.updated
      })
    } else {
      mappedData.push({
        brandPK: item.brand.sub,
        brandImg: item.brand.logo_link || '',
        brandName: item.brand.official_name,
        items: [
          {
            budget: item.invoice.subtotal,
            category: item.product_category_platform.product_category_platform_name,
            icon: item.product_category.product_category_picture_link || '',
            name: item.product_category.product_category_name,
            quantity: item.invoice.quantity,
            status: item.invoice.invoice_status,
            created: item.invoice.updated
          }
        ]
      })
    }
  }

  return (
    <div className={styles.deals}>
      <Title />
      <div className={styles.dealsMain}>
        <TopCards />
        {!isLoading &&
          data &&
          data.items
            .sort((a, b) => {
              const dateA = new Date(a.invoice.created)
              const dateB = new Date(b.invoice.created)
              return dateB.getTime() - dateA.getTime()
            })
            .map(
              (deals) =>
                deals.invoice.invoice_status === 'PAYMENT_PENDING' && (
                  <Review
                    key={deals.invoice.invoice_id}
                    id={deals.invoice.invoice_id}
                    revalidate={refetch}
                    refetchInvoices={refetchInvoices}
                    name={deals.brand.official_name}
                    date={deals.invoice.created}
                    logo_link={deals.brand.logo_link}
                    product={{
                      name: deals.product_category.product_category_name,
                      category: deals.product_category_platform.product_category_platform_name,
                      icon: deals.product_category.product_category_picture_link,
                      quantity: deals.invoice.quantity,
                      price: deals.invoice.subtotal
                    }}
                  />
                )
            )}
        <div className={styles.table}>
          <TableTitle />
          <TableOptions page={page} data={mappedData} />
          <Pagination page={page} total={mappedData.length} />
        </div>
      </div>
    </div>
  )
}

export default Deals

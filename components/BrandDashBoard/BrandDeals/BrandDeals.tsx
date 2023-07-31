'use client'
import Image from 'next/image'
import { useQuery } from 'react-query'

import styles from './BrandDeals.module.scss'

import StatisticCard from '@components/UserDashboard/Toolbox/mainPage/Title/StatisticCard/StatisticCard'

import { getDeals } from '@lib/api/Dashboard/brand/user/deals/getDeals'
import { InvoiceStatus } from '@lib/api/Dashboard/brand/user/deals/models'

import Campaigns from '@assets/BrandDashBoard/brandDeals/icons/campaigns.svg'
import Dot from '@assets/BrandDashBoard/brandDeals/icons/dot.svg'
import Filter from '@assets/BrandDashBoard/brandDeals/icons/filter.svg'
import Inestments from '@assets/BrandDashBoard/brandDeals/icons/inestments.svg'
import MediaReach from '@assets/BrandDashBoard/brandDeals/icons/mediaReach.svg'
import Partners from '@assets/BrandDashBoard/brandDeals/icons/partners.svg'
import noAvatar from '@assets/UserDashboard/profile/images/avatar_no.png'

const BrandDeals = () => {
  const { data, isLoading } = useQuery('invoicesBrand', () => getDeals(), {
    staleTime: Infinity
  })
  if (!isLoading) {
    console.log(data)
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'CANCELLED':
        return styles.singeCampaigns__cartStatusCircle_CANCELLED
      case 'PAYMENT_COMPLETED':
        return styles.singeCampaigns__cartStatusCircle_PAYMENT_COMPLETED
      case 'PARTIAL_PAYMENT':
        return styles.singeCampaigns__cartStatusCircle_PARTIAL_PAYMENT
      case 'PAYMENT_PENDING':
        return styles.singeCampaigns__cartStatusCircle_PAYMENT_PENDING
      default:
        return styles.singeCampaigns__cartStatusCircle_PAYMENT_COMPLETED
    }
  }
  const getStatusSpanStyle = (status: string) => {
    switch (status) {
      case 'CANCELLED':
        return styles.singeCampaigns__cartStatusSpan_CANCELLED
      case 'PAYMENT_COMPLETED':
        return styles.singeCampaigns__cartStatusSpan_PAYMENT_COMPLETED
      case 'PARTIAL_PAYMENT':
        return styles.singeCampaigns__cartStatusSpan_PARTIAL_PAYMENT
      case 'PAYMENT_PENDING':
        return styles.singeCampaigns__cartStatusSpan_PAYMENT_PENDING
      default:
        return styles.singeCampaigns__cartStatusSpan_PAYMENT_COMPLETED
    }
  }
  return (
    <div className='brandDeals'>
      {/*pageTitleB*/}
      <div className={styles.brandDeals__pageTitleBlock}>
        <div className={styles.brandDeals__pageTitleContainer}>
          <span className={styles.brandDeals__pageTitle}>Deals management</span>
        </div>
      </div>
      <div className={styles.brandDeals__scroolableBlock}>
        <div className={styles.brandDeals__pageTitleCarts}>
          <StatisticCard title='Campaigns' img={<Campaigns />} stats='12' />
          <StatisticCard title='Partners' img={<Partners />} stats='13' />
          <StatisticCard title='Media reach' img={<MediaReach />} stats='340k' />
          <StatisticCard title='Marketing spend' img={<Inestments />} stats='€1500' />
        </div>
        {/*single campaigns section*/}
        <div className={styles.singeCampaigns}>
          <div className={styles.singeCampaigns__titleBlock}>
            <span className={styles.singeCampaigns__title}>Single campaigns</span>
            <div className={styles.singeCampaigns__filterBtnBlock}>
              <Filter className={styles.singeCampaigns__filterBtnImg} />
              <span className={styles.singeCampaigns__filterBtnSpan}>Filter</span>
            </div>
          </div>
          <div className={styles.singeCampaigns__mainBlock}>
            <div className={styles.singeCampaigns__carts}>
              {!isLoading &&
                data &&
                data.items
                  .sort((a, b) => {
                    const dateA = new Date(a.invoice.created)
                    const dateB = new Date(b.invoice.created)
                    return dateB.getTime() - dateA.getTime()
                  })
                  .map((deal) => (
                    <div key={deal.invoice.invoice_id} className={styles.singeCampaigns__cart}>
                      <div className={styles.singeCampaigns__cartImgBlock}>
                        <img
                          loading='lazy'
                          className={styles.singeCampaigns__cartImg}
                          alt='Image'
                          //@ts-ignore
                          src={deal.right_holder.link ? deal.right_holder.link : noAvatar}
                        />
                      </div>
                      <div className={styles.singeCampaigns__contentBlock}>
                        <div className={styles.singeCampaigns__cartCountyRoleBlock}>
                          {deal.right_holder.country.country_code && (
                            <Image
                              className={styles.singeCampaigns__cartFlagImg}
                              src={`/countries/${deal.right_holder.country.country_code}.svg`}
                              alt={deal.right_holder.country.country_code}
                              loading={'eager'}
                              width={22}
                              height={14}
                            />
                          )}
                          <span className={styles.singeCampaigns__cartCountySpan}>
                            {deal.right_holder.country_name}
                          </span>
                          <div className={styles.singeCampaigns__cartRoleBlock}>
                            <Dot className={styles.singeCampaigns__cartDot} />
                            <span className={styles.singeCampaigns__cartRoleSpan}>
                              {deal.right_holder.kind_of_sport.name}
                            </span>
                          </div>
                        </div>
                        <div className={styles.singeCampaigns__cartName}>
                          {deal.right_holder.first_name} {deal.right_holder.last_name}
                        </div>
                        <div className={styles.singeCampaigns__cartStatusBlock}>
                          <div
                            className={`${styles.singeCampaigns__cartStatusCircle} ${getStatusStyle(
                              deal.invoice.invoice_status
                            )}`}
                          ></div>
                          <span
                            className={`${
                              styles.singeCampaigns__cartStatusSpan
                            } ${getStatusSpanStyle(deal.invoice.invoice_status)}`}
                          >
                            {InvoiceStatus[deal.invoice.invoice_status]}
                          </span>
                        </div>
                        <div className={styles.singeCampaigns__carBtn}>View details</div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrandDeals

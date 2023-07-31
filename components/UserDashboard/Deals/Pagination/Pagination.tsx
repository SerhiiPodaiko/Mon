import { useRouter } from 'next/navigation'
import { useQuery } from 'react-query'

import styles from './Pagination.module.scss'

import { getDeals } from '@lib/api/Dashboard/RightsHolder/user/deals/getDeals'

import PaginationArrowRight from '@assets/UserDashboard/deals/icons/pagArrowRight.svg'

const Pagination = ({ page, total }: { page: string; total: number }) => {
  const { data, isLoading } = useQuery('invoices', () => getDeals(), { staleTime: Infinity })
  const router = useRouter()

  if (!data || isLoading) {
    return null
  }

  const totalPages = Math.ceil(total / 3)

  const goToPrevPage = () => {
    if (data && Number(page) !== 1) {
      router.push(`/dashboard/user/deals/${Number(page) - 1}`)
    }
  }

  const goToNextPage = () => {
    if (data && Number(page) < totalPages) {
      router.push(`/dashboard/user/deals/${Number(page) + 1}`)
    }
  }

  return (
    <div className={styles.table__paginationBlock}>
      <div className={styles.table__pagination}>
        {/* Render left arrow if the current page is not the first page */}
        {Number(page) !== 1 && (
          <PaginationArrowRight
            onClick={() => goToPrevPage()}
            className={styles.table__paginationLeftArrow}
          />
        )}
        <span className={styles.table__paginationSpan}>
          {/* Display current page number and total number of pages */}
          Page {page} of {totalPages}
        </span>

        {/* Render right arrow if the current page is not the last page */}
        {data && Number(page) < totalPages && (
          <PaginationArrowRight
            onClick={() => goToNextPage()}
            className={styles.table__paginationRightArrow}
          />
        )}
      </div>
    </div>
  )
}

export default Pagination

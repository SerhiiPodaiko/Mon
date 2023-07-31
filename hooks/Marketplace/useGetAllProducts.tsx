import { usePathname } from 'next/navigation'
import { useQuery } from 'react-query'

import { fetchGetAllProducts, getMediaChannels } from '@lib/api/Marketplace'
import { PublicProduct } from '@lib/api/Marketplace/models'

const useGetAllProducts = () => {
  const pathname: string | null = usePathname()

  const pathnameArr = pathname?.split('/')

  // Query request
  const getAllProducts = useQuery(
    'getAllProducts',
    () =>
      fetchGetAllProducts({
        order_by: ['price desc', 'name asc'],
        with_count: true
      }),
    { staleTime: Infinity, keepPreviousData: true }
  )

  const getMediaChannelsRH = useQuery(
    'mediaChannelsRH',
    () => getMediaChannels(pathnameArr ? pathnameArr[pathnameArr.length - 1] : ''),
    { staleTime: Infinity, keepPreviousData: true }
  )

  const isFederateUrlPath = pathname?.includes('federate')

  const singleSportsmenInfo = getAllProducts?.data?.items?.find((user: PublicProduct) =>
    pathname?.includes(user?.right_holder?.rights_holder_sub)
  )

  return {
    isLoading: getMediaChannelsRH.isLoading && getAllProducts.isLoading,
    isFederateUrlPath,
    singleSportsmenInfo,
    data: getAllProducts.data,
    mediaChannels: getMediaChannelsRH.data,
    mediaChannelsRevalidate: getMediaChannelsRH.refetch,
    isSuccess: getMediaChannelsRH.isSuccess && getAllProducts.isSuccess
  }
}

export default useGetAllProducts

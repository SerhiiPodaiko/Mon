'use client'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useMutation, useQuery } from 'react-query'

import { getAllCategories } from '@lib/api/Dashboard/RightsHolder/user/toolbox/getCategories'
import { fetchSingleProduct } from '@lib/api/Marketplace'

export const SingleMarketplaceContext = createContext<any>(null)

const SingleMarketplaceProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTypeIndex, setSelectedTypeIndex] = useState<number>(0)
  const pathname = usePathname()
  const { mutate: getSingleProduct, data: userProducts } = useMutation(fetchSingleProduct)
  const { data: categoryTiers } = useQuery('categories', () => getAllCategories(), {
    staleTime: Infinity
  })

  const rightsHolderSub = pathname?.replace('/marketplace/', '')
  const platform: any = {}

  const products = userProducts?.items?.map((item: any) => {
    const obj: any = { categories: {}, platforms: {}, groups: {} }

    if (categoryTiers?.length) {
      for (let i = 0; i < categoryTiers?.length; i++) {
        for (let j = 0; j < categoryTiers[i]?.product_category_groups?.length; j++) {
          for (
            let k = 0;
            k < categoryTiers[i]?.product_category_groups[j]?.product_category_categories?.length;
            k++
          ) {
            const tmpCategoryId: any =
              categoryTiers[i]?.product_category_groups[j]?.product_category_categories[k]
                ?.product_category_id

            if (tmpCategoryId === item?.product?.product_category_id) {
              obj.categoryId =
                categoryTiers[i]?.product_category_groups[j]?.product_category_categories[
                  k
                ]?.product_category_id
              obj.categoryName =
                categoryTiers[i]?.product_category_groups[j]?.product_category_categories[
                  k
                ]?.product_category_name
              obj.categories[obj.categoryId] = obj.categoryName
              obj.groupName =
                categoryTiers[i]?.product_category_groups[j]?.product_category_group_name
              obj.groupId = categoryTiers[i]?.product_category_groups[j]?.product_category_group_id
              obj.groups[obj.groupId] = obj.groupName
              obj.platformName = categoryTiers[i]?.product_category_platform_name
              obj.platformId = categoryTiers[i]?.product_category_platform_id
              obj.platforms[obj.platformId] = obj.platformName

              platform[obj.platformName] = platform[obj.platformName]
                ? ++platform[obj.platformName]
                : 1
            }
          }
        }
      }
    }

    obj.id = item?.product?.product_id
    obj.price = item?.product?.product_price
    obj.availableCount = item?.product?.product_available_count
    obj.title = obj?.groups[Object.keys(obj?.groups)[0]]
    obj.imgLink = ''

    return obj
  })

  useEffect(() => {
    getSingleProduct({
      order_by: ['price desc', 'name asc'],
      where: {
        or: [
          {
            product_rights_holder_sub: {
              eq: rightsHolderSub
            }
          }
        ]
      },
      with_count: true
    })
  }, [])

  const platforms = Object.keys(platform).map((key) => ({
    title: key,
    count: platform[key]
  }))

  return (
    <SingleMarketplaceContext.Provider
      value={{
        products,
        platforms: platforms,
        selectedTypeIndex,
        setSelectedTypeIndex
      }}
    >
      {children}
    </SingleMarketplaceContext.Provider>
  )
}

export default SingleMarketplaceProvider

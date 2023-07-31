// Import the required dependencies and functions
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useQuery } from 'react-query'

import styles from './Product.module.scss'

import Item, { Child } from '@components/UserDashboard/Toolbox/productPage/Item/Item'
import Navigation from '@components/UserDashboard/Toolbox/productPage/Navigation/Navigation'
import Title from '@components/UserDashboard/Toolbox/productPage/Title/Title'

import { getCategories } from '@lib/api/Dashboard/RightsHolder/user/toolbox/getCategories'
import { getCategoriesAsRH } from '@lib/api/Dashboard/RightsHolder/user/toolbox/getCategoriesAsRH'
import { ProductPutData } from '@lib/api/Dashboard/RightsHolder/user/toolbox/models'
import { postProduct } from '@lib/api/Dashboard/RightsHolder/user/toolbox/postProduct'
import { putProduct } from '@lib/api/Dashboard/RightsHolder/user/toolbox/putProduct'

// Define the Product component
const Product = ({ params }: { params: { product_key: string } }) => {
  // Query the categories using react-query
  const { data } = useQuery('categories', () => getCategories(), {
    staleTime: Infinity
  })

  // Query the categories as RightsHolder using react-query
  const { data: holderCategories, refetch } = useQuery('categoriesRH', () => getCategoriesAsRH(), {
    staleTime: Infinity
  })

  // Find the elementData for RightsHolder and the selected elementData
  const elementDataRH = holderCategories?.items.find(
    (el) => el.ProductModel.product_category_id === params.product_key
  )
  // console.log('data', data)
  // Find the CategoryGroup from params
  const categoryGroupData = data?.find((category) => {
    if (
      category.product_category_groups.some((group) =>
        group.product_category_categories.some(
          (product) => product.product_category_id === params.product_key
        )
      )
    ) {
      return true
    }
  })
  // console.log('categoryGroupData', categoryGroupData)

  // Find the Group from categoryGroupData
  const groupData = categoryGroupData?.product_category_groups.find((group) =>
    group.product_category_categories.some(
      (product) => product.product_category_id === params.product_key
    )
  )
  // console.log('groupData', groupData)

  // Find the product in groupData
  const productData = groupData?.product_category_categories.find(
    (el) => el.product_category_id === params.product_key
  )
  // console.log('productData', productData)

  const router = useRouter()

  // Initialize the state for updatedData using useState
  const [updatedData, setUpdatedData] = useState<ProductPutData>({
    product_id: '',
    product_available_count: 0,
    product_category_id: '',
    product_price: 0,
    product_show: false
  })

  // Define the mutation using useMutation to update or create a product
  const { mutate } = useMutation({
    mutationFn: () =>
      elementDataRH
        ? putProduct(updatedData).then(refetch)
        : // If elementDataRH exists, update the product using putProduct
          postProduct(updatedData, productData?.product_category_id).then(refetch) // Otherwise, create a new product using postProduct
  })

  // Update the state for updatedData when elementData and elementDataRH change
  useEffect(() => {
    if (groupData && elementDataRH) {
      setUpdatedData({
        product_id: elementDataRH.ProductModel.product_id,
        product_available_count: elementDataRH.ProductModel.product_available_count,
        product_category_id: elementDataRH.ProductModel.product_category_id,
        product_price: elementDataRH.ProductModel.product_price,
        product_show: elementDataRH.ProductModel.product_show
      })
    }
  }, [data, holderCategories])
  // console.log(productData)
  if (!groupData || !productData || !data) {
    return <span>Загрузка...</span>
  }

  const childs: Child[] = groupData.product_category_categories.map((el) => ({
    key: el.product_category_id,
    iconURL: el.product_category_picture,
    name: el.product_category_name
  }))

  // Create an array of keys from data

  const childsKeys: string[] = []
  for (const category of data) {
    for (const group of category.product_category_groups) {
      for (const product of group.product_category_categories) {
        childsKeys.push(product.product_category_id)
      }
    }
  }
  // Find the key of the next element
  const nextElKey = () => {
    // Find an index of the current element
    const index = childsKeys.indexOf(params.product_key)
    // If the current element is the last one, return the first element
    if (index === childsKeys.length - 1) {
      return childsKeys[0]
    }
    // Otherwise, return the next element
    return childsKeys[index + 1]
  }

  // Find the key of the previous element
  const prevElKey = () => {
    // Find an index of the current element
    const index = childsKeys.indexOf(params.product_key)
    // If the current element is the first one, return the last element
    if (index === 0) {
      return childsKeys[childsKeys.length - 1]
    }
    // Otherwise, return the previous element
    return childsKeys[index - 1]
  }

  // Save the updatedData and go back to the previous page
  const saveAndGoBack = () => {
    mutate()
    console.log('Save and go to the previous page')
    router.push(`/dashboard/user/toolbox`)
  }

  return (
    <div className={styles.toolbox}>
      <Title
        disabled={updatedData.product_available_count === 0 || updatedData.product_price === 0}
        save={saveAndGoBack}
      />
      <div className={styles.toolboxMain}>
        <Item
          id={params.product_key}
          updatedData={updatedData}
          setUpdatedData={setUpdatedData}
          title={groupData.product_category_group_name}
          description={productData.product_category_description}
          childs={childs}
          imageLink={productData.product_category_picture}
        />
        <Navigation prevKey={nextElKey()} nextKey={prevElKey()} />
      </div>
    </div>
  )
}

export default Product

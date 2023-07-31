'use client'
import { ChangeEvent, createContext, ReactNode, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import useRootStore from '@store/RootStore'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import CartCampaignDetails from '@components/Cart/components/CampaignDetails/CartCampaignDetails'
import CartCampaignBrief from '@components/Cart/components/CartCampaignBrief/CartCampaignBrief'
import CartPaymentOptions from '@components/Cart/components/CartPaymentOptions/CartPaymentOptions'
import CartConfigurationList from '@components/Cart/components/CartСonfiguration/CartСonfiguration'

export const CartContext = createContext<any>(null)

type InputsCampaignDetails = {
  campaign_name: ''
  campaign_description: ''
  campaign_start_date: ''
  campaign_end_date: ''
  campaign_service_reference: ''
  campaign_item_product_category_id: ''
  campaign_item_details: ''
  campaign_item_duration: ''
  campaign_item_post_description: ''
  campaign_item_hashtag: ''
  campaign_item_link: ''
  campaign_item_mention: ''
  campaign_item_rules_of_giveaway: ''
  campaign_item_datetime: ''
  campaign_item_interview: ''
  campaign_item_location: ''
  campaign_item_terms: ''
  campaign_item_file_filename: ''
  campaign_item_id: ''
  base64_file: ''
  campaign_items: [
    {
      campaign_item_product_category_id: ''
      campaign_item_details: ''
      campaign_item_post_description: ''
      campaign_item_hashtag: ''
      campaign_item_link: ''
      campaign_item_mention: ''
    }
  ]
}
const CartProvider = ({ children }: { children: ReactNode }) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [fileView, setFileView] = useState<string | null>(null)

  const { cartStore } = useRootStore()

  const {
    register,
    watch,
    control,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<InputsCampaignDetails>({ mode: 'onChange' })
  const paymentFormRef = useRef<HTMLFormElement | null>(null)

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        const result = reader?.result as string

        setSelectedFile(result?.replace(/^data:image\/\w+;base64,/, '') || selectedFile)
        setFileView(result)
      }
      reader.readAsDataURL(file)
    } else {
      setSelectedFile(null)
      setFileView(null)
    }
  }

  const buildCampaignItem = (product: any) => {
    return {
      campaign_item_product_category_id: product.categoryId,
      campaign_item_details: product.productId,
      campaign_item_post_description: '',
      campaign_item_hashtag: '',
      campaign_item_link: '',
      campaign_item_mention: '',
      files: []
    }
  }

  const addFileToCampaignItem = (product: any, file: any) => {
    product.files = product?.files ?? []
    return product.files.push({
      campaign_item_file_filename: file.name,
      base64_file: file
    })
  }

  const files: any = {}

  const campaignDataObject = {
    campaign: {
      campaign_name: watch('campaign_name'),
      campaign_description: watch('campaign_description'),
      campaign_start_date: watch('campaign_start_date')?.split('.').reverse().join('-'),
      campaign_end_date: watch('campaign_end_date')?.split('.').reverse().join('-'),
      campaign_service_reference: watch('campaign_service_reference')
    },
    campaign_items: []
  }

  campaignDataObject.campaign_items = campaignDataObject.campaign_items.length
    ? campaignDataObject.campaign_items
    : cartStore.cartData.map((product: any, idx: number) => {
        return {
          campaign_item_product_category_id: product.categoryId,
          campaign_item_post_description: product.productId,
          // @ts-ignore
          campaign_item_details: watch(`campaign_items.${idx}.campaign_item_details`),
          // @ts-ignore
          campaign_item_hashtag: watch(`campaign_items.${idx}.campaign_item_hashtag`),
          // @ts-ignore
          campaign_item_link: watch(`campaign_items.${idx}.campaign_item_link`),
          // @ts-ignore
          campaign_item_mention: watch(`campaign_items.${idx}.campaign_item_mention`),
          files: []
        }
      })

  const renderStep = () => {
    switch (cartStore.step) {
      case 1:
        return <CartConfigurationList />
      case 2:
        return <CartCampaignDetails />
      case 3:
        return <CartCampaignBrief />
      case 4:
        return (
          <Elements stripe={loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)}>
            <CartPaymentOptions />
          </Elements>
        )
    }
  }

  return (
    <CartContext.Provider
      value={{
        register,
        watch,
        errors,
        control,
        campaignDataObject,
        buildCampaignItem,
        addFileToCampaignItem,
        fileView,
        getValues,
        setValue,
        files,
        selectedFile,
        paymentFormRef,
        renderStep,
        handleFileChange
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider

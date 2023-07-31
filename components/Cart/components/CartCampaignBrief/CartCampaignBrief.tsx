import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import useRootStore from '@store/RootStore'

import styles from './CartCampaignBrief.module.scss'

import { fetchCreateCampaignCart } from '@lib/api/Cart'

import Preloader from '@ui/Preloader/Preloader'

import { CartContext } from '@context/Cart/CartContext'

import UploadSVG from '@assets/Icons/upload.svg'
import WebsiteSVG from '@assets/Icons/website.svg'
import ProductSVG from '@assets/Images/cart/product.svg'

const CartCampaignBrief = () => {
  const { register, watch, campaignDataObject, setValue, files } = useContext(CartContext)
  const {
    mutate: crateCampaignMutate,
    isSuccess,
    isError,
    isLoading
  } = useMutation('crateCampaign', fetchCreateCampaignCart)
  const { cartStore } = useRootStore()
  const [index, setIndex] = useState<number>(0)
  const [isActiveList, setIsActiveList] = useState<boolean[]>(
    Array(cartStore.cartData?.length).fill(false)
  )

  if (isActiveList.length > 0 && !isActiveList.includes(true)) {
    setIsActiveList((prevIsActiveList) => {
      const updatedList = [...prevIsActiveList]
      updatedList[0] = true
      return updatedList
    })
  }

  const onDetailsItem = (index: number) => {
    setIndex(index)
    const updatedIsActiveList = isActiveList.map((value, i) => (i === index ? !value : false))
    setIsActiveList(updatedIsActiveList)
  }

  const handleCreateCampaign = async () => {
    await crateCampaignMutate(campaignDataObject)

    if (isSuccess) {
      cartStore.changeStep(cartStore.step + 1)
    }
  }

  useEffect(() => {
    if (isError) {
      toast.error('Error!')
    }
  }, [isError])

  console.log('getValues', campaignDataObject)

  const isNotEmptyFields = campaignDataObject?.campaign_items?.every((obj: any) =>
    Object.values(obj).every(Boolean)
  )

  return (
    <div className={styles.campaignBrief}>
      <h3 className={styles.campaignBrief__title}>Campaign Brief</h3>
      <div className={styles.campaignBrief__inner}>
        <div className={styles.campaignBrief__left}>
          <header className={styles.campaignBrief__leftHeader}>
            <div className={styles.campaignBrief__leftHeaderWrapper}>
              <span className={styles.campaignBrief__leftHeaderDate}>
                {watch('campaign_start_date')}
              </span>
              <p className={styles.campaignBrief__leftHeaderTitle}>Campaign #1</p>
            </div>
            <button
              disabled={!isNotEmptyFields}
              onClick={handleCreateCampaign}
              className={styles.campaignBrief__leftHeaderBtn}
            >
              {isLoading ? <Preloader /> : 'Proceed to checkout'}
            </button>
          </header>
          <span className={styles.campaignBrief__leftActivations}>Activations</span>
          <ul className={styles.campaignBrief__leftList}>
            {cartStore.cartData?.map((product: any, idx: number) => (
              <li
                key={product.categoryId}
                onClick={() => onDetailsItem(idx)}
                className={`${styles.campaignBrief__leftListItem} ${
                  isActiveList[idx] ? styles.campaignBrief__leftListItemActive : ''
                }`}
              >
                <div className={styles.campaignBrief__leftListItemImg}>
                  <ProductSVG />
                </div>
                <div className={styles.campaignBrief__leftListItemText}>
                  <span>{product.platformName}</span>
                  <p>{product.productName}</p>
                </div>
                <button
                  className={`${styles.campaignBrief__leftListItemBtn} ${
                    isActiveList[idx] ? styles.campaignBrief__leftListItemBtnActive : ''
                  }`}
                >
                  Add details
                </button>
              </li>
            ))}
          </ul>
        </div>
        <CartCampaignBriefRightSide
          values={campaignDataObject.campaign_items[index]}
          files={files}
          register={register}
          index={index}
          setFieldValue={setValue}
        />
      </div>
    </div>
  )
}

const CartCampaignBriefRightSide = ({
  register,
  index,
  values,
  setFieldValue,
  files
}: {
  register: any
  index: number
  values: any
  setFieldValue: any
  files: any
}) => {
  const fileRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setFieldValue(`campaign_items.${index}.campaign_item_details`, values.campaign_item_details)
    setFieldValue(`campaign_items.${index}.campaign_item_hashtag`, values.campaign_item_hashtag)
    setFieldValue(`campaign_items.${index}.campaign_item_mention`, values.campaign_item_mention)
    setFieldValue(`campaign_items.${index}.campaign_item_link`, values.campaign_item_link)
    setSelectedFile(files[values?.campaign_item_product_category_id]?.base64_file)
  }, [index])

  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [fileView, setFileView] = useState<string | null>(null)

  useEffect(() => {
    files[values?.campaign_item_product_category_id] =
      files[values?.campaign_item_product_category_id] || {}
    setSelectedFile(files[values?.campaign_item_product_category_id]?.base64_file)
  }, [files[values?.files?.campaign_item_product_category_id]])

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log('EVENT', event)
    console.log('event.target.files?.[0]', event.target.files?.[0])
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
    const res = {
      campaign_item_file_filename: file?.name,
      base64_file: selectedFile
    }
    files[values?.campaign_item_product_category_id] = res
  }

  return (
    <div className={styles.campaignBrief__right}>
      <div className={styles.campaignBrief__rightBlock}>
        <h4 className={styles.campaignBrief__rightBlockTitle}>Photo of product / services</h4>
        <p className={styles.campaignBrief__rightBlockSubtitle}>2 items</p>
      </div>
      <form className={styles.campaignBrief__rightForm}>
        <div className={styles.campaignBrief__rightFormGroup}>
          <label className={styles.campaignBrief__rightFormLabel}>
            Details <br />
            <span>Short description about the company</span>
          </label>
          <textarea
            {...register(`campaign_items.${index}.campaign_item_details`, {
              required: 'Required field!'
            })}
            className={styles.campaignBrief__rightFormTextArea}
            placeholder='post description'
          ></textarea>
        </div>
        <div className={styles.campaignBrief__rightFormGroupRow}>
          <div className={styles.campaignBrief__rightFormGroupRowBlock}>
            <label className={styles.campaignBrief__rightFormLabel}>Hashtag</label>
            <input
              {...register(`campaign_items.${index}.campaign_item_hashtag`, {
                required: 'Required field!'
              })}
              type='text'
              className={styles.campaignBrief__rightFormInput}
              placeholder='#'
            />
          </div>
          <div className={styles.campaignBrief__rightFormGroupRowBlock}>
            <label className={styles.campaignBrief__rightFormLabel}>Mention</label>
            <input
              {...register(`campaign_items.${index}.campaign_item_mention`, {
                required: 'Required field!'
              })}
              type='text'
              className={styles.campaignBrief__rightFormInput}
              placeholder='@'
            />
          </div>
        </div>
        <div className={styles.campaignBrief__rightFormGroup}>
          <label className={styles.campaignBrief__rightFormLabel}>Link</label>
          <div className={styles.campaignBrief__rightFormGroupWebsite}>
            <WebsiteSVG />
            <span>http://</span>
          </div>
          <input
            {...register(`campaign_items.${index}.campaign_item_link`, {
              required: 'Required field!'
            })}
            type='text'
            className={`${styles.campaignBrief__rightFormInput} ${styles.campaignBrief__rightFormInputWebsite}`}
            placeholder={`Enter website link${index}`}
          />
        </div>
        <div className={styles.campaignBrief__rightFormGroup}>
          <label className={styles.campaignBrief__rightFormLabel}>
            Upload marketing materials <br />
            <span>Maximum size of file is 1.5 Mb</span>
          </label>
          <div
            className={`${styles.campaignBrief__rightBlockFile} ${
              fileView ? styles.campaignBrief__rightBlockFileDone : ''
            }`}
          >
            <div>
              {fileView ? <img src={fileView} alt='File' /> : <UploadSVG />}
              <br />
              {fileView ? null : <span>Upload</span>}
            </div>
            <input
              ref={fileRef}
              accept='image/*'
              type='file'
              onChange={handleFileChange}
              className={styles.campaignBrief__rightFormInputFile}
              placeholder='Upload'
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default CartCampaignBrief

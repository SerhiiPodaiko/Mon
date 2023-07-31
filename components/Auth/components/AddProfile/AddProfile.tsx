'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { useMediaQuery } from 'react-responsive'

import styles from './AddProfile.module.scss'

import { PAGE_SLUGS } from '@constants/pages'

import { fetchRegisterProfile } from '@lib/api/Auth/fetchRegister'
import { getCountries } from '@lib/api/Countries/getCountries'
import { uploadPhoto } from '@lib/api/Dashboard/RightsHolder/uploadPhoto'
import { fetchGetAllCategoriesSport } from '@lib/api/Marketplace'

import AddUserSVG from '@assets/Icons/add-user.svg'
import RobotSVG from '@assets/Icons/robots/robot-9.svg'
import LogoSVG from '@assets/Images/logo.svg'
import LogoMobileSVG from '@assets/Images/logo-mobile.svg'

type Inputs = {
  avatar: string
  name: string
  surname: string
  qualification: string
  location: string
}

const AddProfile = () => {
  const [file, setFile] = useState<any>(null)
  const [fileName, setFileName] = useState<any>(null)
  const isMobile = useMediaQuery({ maxWidth: 767 })

  const {
    register,
    handleSubmit,
    formState: { isValid }
  } = useForm<Inputs>({ mode: 'onChange' })
  const { data: dataCountries } = useQuery('getAllCounties', getCountries)
  const { data: dataSportCategories } = useQuery(
    'getAllSportCategories',
    fetchGetAllCategoriesSport
  )
  const { mutate: createUser, isSuccess } = useMutation('registerProfile', fetchRegisterProfile)
  const router = useRouter()

  const onSubmitHandler = (values: any) => {
    console.log('values', values)
    const findPk = dataSportCategories.find((item: any) => {
      return item.name === values?.qualification ? item.pk : null
    })

    createUser({
      first_name: values?.name,
      last_name: values?.surname,
      country_name: values?.location,
      kind_of_sport_pk: findPk?.pk,
      file_name: fileName
    })
  }

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => router.push(PAGE_SLUGS.userProfile), 2000)
    }
  }, [isSuccess])

  return (
    <section className={styles.addProfile}>
      <div className={styles.addProfile__logo}>
        <Link href={PAGE_SLUGS.home}>{isMobile ? <LogoMobileSVG /> : <LogoSVG />}</Link>
      </div>
      <div className={styles.addProfile__inner}>
        <div className={styles.addProfile__head}>
          <h2 className={styles.addProfile__title}>Welcome</h2>
          <p className={styles.addProfile__subtitle}>
            let’s create {isMobile && <br />}
            <span>your profile</span>
          </p>
        </div>
        <div className={styles.addProfile__content}>
          <form className={styles.addProfile__form} onSubmit={handleSubmit(onSubmitHandler)}>
            <div className={styles.addProfile__group}>
              <div className={styles.addProfile__avatarWrapper}>
                <div className={styles.addProfile__avatar}>
                  {file ? (
                    <Image
                      src={file}
                      className={styles.addProfile__avatar__user}
                      width={130}
                      height={130}
                      alt='Upload'
                    />
                  ) : (
                    <AddUserSVG />
                  )}
                </div>
                <div>
                  <label className={styles.addProfile__fileLabel}>Add an avatar</label>
                  <label className={styles.addProfile__file}>
                    Choose image
                    <input
                      onChange={(event) => {
                        if (event.target.files && event.target.files[0]) {
                          uploadPhoto(event.target.files[0]).then((res) => {
                            if (res?.link) {
                              setFile(res.link)
                              setFileName(res.filename)
                            }
                          })
                        }
                      }}
                      type='file'
                      placeholder='Choose image'
                      className={styles.addProfile__inputFile}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className={styles.addProfile__group}>
              <label htmlFor='name' className={styles.addProfile__label}>
                Your name
              </label>
              <input
                {...register('name', {
                  required: 'Required filed!'
                })}
                id='name'
                placeholder='Enter your name'
                className={styles.addProfile__input}
              />
            </div>
            <div className={styles.addProfile__group}>
              <label htmlFor='surname' className={styles.addProfile__label}>
                Your surname
              </label>
              <input
                {...register('surname', {
                  required: 'Required filed!'
                })}
                id='name'
                placeholder='Enter your surname'
                className={styles.addProfile__input}
              />
            </div>
            <div className={styles.addProfile__group}>
              <label htmlFor='sport' className={styles.addProfile__label}>
                Add your sport
              </label>
              <select
                {...register('qualification', {
                  required: 'Required filed!'
                })}
                id='sport'
                className={styles.addProfile__select}
              >
                <option value='' hidden>
                  Choose sport
                </option>
                {dataSportCategories?.map((category: any) => (
                  <option key={category.pk} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.addProfile__group}>
              <label htmlFor='location' className={styles.addProfile__label}>
                Add your location
              </label>
              <select
                {...register('location', {
                  required: 'Required filed!'
                })}
                id='location'
                className={styles.addProfile__select}
              >
                <option value='' hidden>
                  Enter a location
                </option>
                {dataCountries?.map((country: any) => (
                  <option key={country?.country_name} value={country?.country_name}>
                    {country?.country_name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.addProfile__group}>
              <button disabled={!isValid} className={styles.addProfile__btn}>
                Create an account
              </button>
            </div>
          </form>
          {isMobile && (
            <div className={styles.addProfile__line}>
              <span></span>
            </div>
          )}
        </div>
        <RobotSVG className={styles.addProfile__robot} />
      </div>
    </section>
  )
}

export default AddProfile

'use client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import styles from './Performance.module.scss'

import Option from '@components/UserDashboard/Profile/Performance/Option/Option'

import { getPerformanceData } from '@lib/api/Dashboard/RightsHolder/user/profile/getPerformanceData'
import { getUserMe } from '@lib/api/Dashboard/RightsHolder/user/profile/getUserMe'
import { SportsmanPerformance } from '@lib/api/Dashboard/RightsHolder/user/profile/models'

import BluePlus from '@assets/UserDashboard/profile/icons/bluePlus.svg'

type Props = {
  sportsmanPerformance: SportsmanPerformance[]
  setSportsmanPerformance: Dispatch<SetStateAction<SportsmanPerformance[]>>
}

const Performance = ({ sportsmanPerformance, setSportsmanPerformance }: Props) => {
  // Fetch performance data using react-query
  const { isLoading, data, refetch } = useQuery('performance', getPerformanceData, {
    staleTime: Infinity
  })

  // Fetch user profile data using react-query
  const { data: profileData } = useQuery('profile', getUserMe, {
    staleTime: Infinity
  })

  useEffect(() => {
    // When data is available, update the sportsmanPerformance state with the fetched data
    if (data) {
      setSportsmanPerformance([...data])
    }
  }, [data, isLoading])

  // Function to add a new empty option to sportsmanPerformance state
  const addNewOption = () => {
    setSportsmanPerformance((s) => {
      return [
        ...s,
        {
          pk: '',
          name: 'Competition name',
          start_date: '',
          end_date: '',
          position: 1,
          location: '',
          kind_of_sport: {
            name: 'Football',
            sport_type: 'Team sports',
            // @ts-ignore
            pk: profileData.kind_of_sport.pk
          },
          status: 'Ongoing',
          description: '',
          gallery: [],
          gallery_files_links: {}
        }
      ]
    })
    // Reset the activeOption state
    setActiveOption('')
  }

  const [activeOption, setActiveOption] = useState<string | null>(null)

  // Function to toggle the active option
  const handleOptionToggle = (optionPk: string) => {
    setActiveOption((prevOptionPk) => (prevOptionPk === optionPk ? null : optionPk))
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.performance} id='performance'>
      <span className={styles.performance__title}>Performance</span>
      <span className={styles.performance__subTitle}>
        Tell partners more about your professional results.
      </span>
      <div className={styles.performance__options}>
        {/* Render the options using the Option component */}
        {sportsmanPerformance.map((option) => (
          <Option
            key={option.pk}
            option={option}
            setOptions={setSportsmanPerformance}
            refetch={refetch}
            activeOption={activeOption}
            onToggleOption={handleOptionToggle}
          />
        ))}
      </div>
      <div className={styles.performance__addResult} onClick={addNewOption}>
        <BluePlus className={styles.performance__addResultImg} />
        <span className={styles.performance__addResultSpan}>Add new result</span>
      </div>
    </div>
  )
}

export default Performance

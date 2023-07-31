import { useState } from 'react'
import Select from 'react-select'

import styles from './CountriesDropdown.module.scss'

import SearchSVG from '@assets/Icons/search-country.svg'

const countryOptions = [
  { label: 'English', value: 'EN' },
  { label: 'Arabic', value: 'AE' }
  // { label: 'Estonian', value: 'ES' },
  // { label: 'French', value: 'FR' }
]

const SearchIcon = () => {
  return (
    <div style={{ width: 20, height: 20 }}>
      <img src={SearchSVG} alt='search' loading='lazy' />
    </div>
  )
}
const CountriesDropdown = ({
  setDefaultLanguage,
  setMenuToggle
}: {
  setDefaultLanguage: (value: string) => void
  setMenuToggle: (b: boolean) => void
}) => {
  const [selectedOption, setSelectedOption] = useState<any>(null)

  const selectComponents = {
    DropdownIndicator: null,
    IndicatorSeparator: null,
    SearchIcon: SearchIcon
  }
  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption)
    setDefaultLanguage(selectedOption.value)
    setMenuToggle(true)
    console.log(`Ви вибрали:`, selectedOption)
  }

  return (
    <div className={styles.dropdown}>
      <Select
        menuIsOpen={true}
        value={selectedOption}
        onChange={handleChange}
        options={countryOptions}
        components={selectComponents}
        classNamePrefix='react-select'
        className={styles.countrySelect}
        placeholder='Type Language'
      />
    </div>
  )
}

export default CountriesDropdown

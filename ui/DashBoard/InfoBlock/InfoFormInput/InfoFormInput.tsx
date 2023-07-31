'use client'
import React, { ChangeEvent, FC, useCallback, useState } from 'react'

import styles from './InfoFormInput.module.scss'

// Props interface for InfoFormInput component
type Props = {
  id: string
  name: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  description?: string
  type: string
  withHide?: boolean
}

// InfoFormInput component
const InfoFormInput: FC<Props> = ({
  id,
  name,
  value,
  onChange,
  description,
  type,
  withHide = false
}) => {
  // State hook for managing the visibility of the input field
  const [hidden, setHidden] = useState(true)

  // Function to determine the input type (e.g., 'password' or 'text')
  const getTypeInput = useCallback(() => {
    if (type === 'password') {
      return hidden ? 'password' : 'text'
    }
    return type
  }, [type, hidden])

  // Function to toggle the visibility of the input field
  const handleToggleHide = useCallback(() => {
    setHidden((prevHidden) => !prevHidden)
  }, [])

  return (
    <div style={{ gridArea: id }} className={styles.wrapper}>
      {/* Label for the input field */}
      <label className={styles.label} htmlFor={id}>
        {name}
      </label>
      {/* Input field */}
      <input
        className={styles.input}
        id={id}
        type={getTypeInput()}
        value={value}
        onChange={onChange}
      />
      {/* Button to toggle visibility of the input field (optional) */}
      {withHide && (
        <span className={styles.hideBtn} onClick={handleToggleHide}>
          {hidden ? 'Show' : 'Hide'}
        </span>
      )}
      {/* Description text (optional) */}
      {description && <span className={styles.description}>{description}</span>}
    </div>
  )
}

export default InfoFormInput

'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

import styles from './CardDrop.module.scss'

import ArrowDown from '@assets/UserDashboard/toolbox/icons/arrowDown.svg'

const CardDrop = () => {
  const [open, setOpen] = useState(false) // State variable for managing the open/close state of the dropdown
  const [selected, setSelected] = useState('week') // State variable for storing the currently selected option

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
  }

  const getSelectedText = (selected: any) => {
    // Function to get the display text for the selected option
    switch (selected) {
      case 'week':
        return 'This week'
      case 'month':
        return 'This month'
      case 'quarter':
        return 'This quarter'
      case 'year':
        return 'This year'
      default:
        return ''
    }
  }

  const handleClick = (type: any) => {
    // Event handler for option click
    setSelected(type) // Update the selected option
    setOpen(!open) // Toggle the dropdown open/close state
  }

  return (
    <>
      <span className={styles.toolbox__pageTitleCartSpan} onClick={() => setOpen(!open)}>
        {getSelectedText(selected)}
      </span>
      <motion.div
        initial={false}
        animate={open ? 'open' : 'close'}
        variants={{
          open: { rotate: '180deg' },
          close: { rotate: '0deg' }
        }}
        onClick={() => setOpen(!open)}
        className={styles.arrowContainer}
      >
        <ArrowDown className={styles.toolbox__pageTitleCartArrow} />
      </motion.div>
      <motion.div
        initial={false}
        animate={open ? 'open' : 'closed'}
        variants={{
          open: {
            clipPath: 'inset(0% 0% 0% 0% round 10px)',
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05
            }
          },
          closed: {
            clipPath: 'inset(10% 50% 90% 50% round 10px)',
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.3
            }
          }
        }}
        className={styles.drop}
      >
        {['week', 'month', 'quarter', 'year'].map((type) => (
          <motion.div
            key={type}
            initial={{ background: '#FFFFFF' }}
            whileHover={{ background: '#1598FF' }}
            variants={itemVariants}
            className={`${styles.dropItem} ${selected === type ? styles.active : ''}`}
            onClick={() => handleClick(type)}
          >
            {getSelectedText(type)}
          </motion.div>
        ))}
      </motion.div>
    </>
  )
}

export default CardDrop

import React, { FC } from 'react'

import styles from './CardBlock.module.scss'

import MasterCardIcon from '@public/paymentTypes/mastercard.svg'
import VisaIcon from '@public/paymentTypes/visa.svg'

interface Props {
  id: string
  lastNums: string
  type: 'Visa' | 'MasterCard'
  isDefault: boolean
  onSetDefault: (id: string) => void
  onDeleteCard: (id: string) => void
}

const CardBlock: FC<Props> = ({ id, lastNums, type, isDefault, onSetDefault, onDeleteCard }) => {
  return (
    <div
      className={`${styles.cardBlock__actualPayment} ${
        isDefault && styles.cardBlock__actualPayment_active
      }`}
    >
      <div className={styles.cardBlock__actualPaymentLeft}>
        <div className={styles.cardBlock__actualPaymentLeftLeft}>
          <div
            className={`${styles.cardBlock__actualPaymentLeftCircleBlock} ${
              isDefault && styles.cardBlock__actualPaymentLeftCircleBlock_active
            }`}
            onClick={() => onSetDefault(id)}
          >
            <div
              className={`${styles.cardBlock__actualPaymentLeftCircle} ${
                isDefault && styles.cardBlock__actualPaymentLeftCircle_active
              }`}
            />
          </div>
        </div>
        <div className={styles.cardBlock__actualPaymentLeftRight}>
          <span className={styles.cardBlock__actualPaymentNumSpan}>**** {lastNums}</span>
          <div className={styles.cardBlock__actualPaymentSubNumBlock}>
            <span className={styles.cardBlock__actualPaymentTypeSpan}>{type}</span>
            <div className={styles.cardBlock__actualPaymentDot} />
            <button
              className={styles.cardBlock__actualPaymentActionSpan}
              onClick={() => onDeleteCard(id)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className={styles.cardBlock__actualPaymentRight}>
        {type === 'Visa' ? (
          <VisaIcon className={styles.cardBlock__actualPaymentRightImg} />
        ) : (
          <MasterCardIcon className={styles.cardBlock__addPaymentsTypeIcon} />
        )}
      </div>
    </div>
  )
}

export default CardBlock

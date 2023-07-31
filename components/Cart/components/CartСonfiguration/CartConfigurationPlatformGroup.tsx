import Skeleton from 'react-loading-skeleton'

import styles from './CartConfiguration.module.scss'

import CartConfigurationItem from './CartСonfigurationItem'

const CartConfigurationPlatformGroup = ({ platformGroup }: { platformGroup: any }) => {
  const productImg = platformGroup[0]?.productImg
  const productName = platformGroup[0]?.productName
  const platformName = platformGroup[0]?.platformName

  return (
    <div className={styles.configuration__product}>
      <div className={styles.configuration__productImgWrapper}>
        {productImg ? (
          <img style={{ width: '67px' }} loading='lazy' src={productImg} alt='Product' />
        ) : (
          <Skeleton />
        )}
      </div>

      <div className={styles.configuration__productInfo}>
        <h4 className={styles.configuration__productInfoTitle}>{productName}</h4>
        <h5 className={styles.configuration__productInfoSubtitle}>{platformName}</h5>
        {platformGroup?.map((product: any) => (
          <CartConfigurationItem key={product?.productId} item={product} />
        ))}
      </div>
    </div>
  )
}

export default CartConfigurationPlatformGroup

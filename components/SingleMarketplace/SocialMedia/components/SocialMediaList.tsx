import Slider from 'react-slick'

import styles from '../SocialMedia.module.scss'

import SocialMediaListItem from './SocialMediaListItem'

const SocialMediaList = ({ sliderRef, userProducts }: { sliderRef: any; userProducts: any }) => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: userProducts?.length >= 4 ? 4 : userProducts?.length,
    slidesToScroll: 1,
    swipe: true,
    waitForAnimate: false,
    initialSlide: 1
  }

  return (
    <Slider ref={sliderRef} {...settings} className={styles.socialMedia__slider}>
      {userProducts?.map((item: any) => (
        <SocialMediaListItem key={item?.id} item={item} />
      ))}
    </Slider>
  )
}

export default SocialMediaList

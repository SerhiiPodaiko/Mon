'use client'
import Slider from 'react-slick'

// import mediaInventory from '@components/SingleMarketplace/MediaInventory/MediaInventory'
import MediaInventoryListItem from './MediaInventoryListItem'

const MediaInventoryList = ({
  sliderRef,
  platforms,
  handleSelected
}: {
  sliderRef: any
  platforms: any
  handleSelected: (index: number) => void
}) => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: platforms?.length >= 4 ? 4 : platforms?.length,
    slidesToScroll: 1,
    swipe: true,
    waitForAnimate: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1
        }
      }
    ]
  }

  const renderListItem = platforms?.map((item: any, index: number) => (
    <MediaInventoryListItem
      handleSelected={handleSelected}
      key={item.title}
      title={item.title}
      count={item.count}
      itemIndex={index}
    />
  ))

  return (
    <Slider ref={sliderRef} {...settings}>
      {renderListItem}
    </Slider>
    // <Swiper>
    //   {renderListItem}
    // </Swiper>
  )
}

export default MediaInventoryList

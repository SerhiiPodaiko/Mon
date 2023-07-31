export type GetProducts = {
  limit: number | string
  skip: number | string
  order_by: any[]
  where: {
    or: [
      {
        price: {
          lt: number | string
        }
      },
      {
        price: {
          gt: number | string
        }
      }
    ]
  }
  with_count: boolean
}

export type ResponseGetProducts = {
  items: [
    {
      first_name: string
      last_name: string
      date_of_birth: string
      address: string
      nationality: string
      qualification: string
      kind_of_sport_pk: string
      country_name: string
      file_name: string
      email: string
      link: string
      kind_of_sport: {
        pk: string
        name: string
        sport_type: string
      }
      rights_holder_sub: string
    }
  ]
  total: string | number
}

export type KindOfSport = {
  pk: string
  name: string
  sport_type: string
}

export type Performance = {
  pk: string
  name: string
  start_date: string
  end_date: string
  position: number
  location: string
  kind_of_sport: KindOfSport
  status: string
  description: string
  gallery: string[]
  gallery_files_links: object
}

export type MediaLibraryVideo = {
  title: string
  video_type: string
  link: string
  pk: string
}

export type MediaLibraryGallery = {
  files: string[]
  pk: string
  gallery_files_links: object
}

export type MediaData = {
  performances: Performance[]
  media_library_videos: MediaLibraryVideo[]
  media_library_gallery: MediaLibraryGallery
}

export interface PublicRH {
  items: PublicProduct[]
  total: number
}

export interface PublicProduct {
  min_price: 0
  right_holder: {
    first_name: string
    last_name: string
    date_of_birth: string
    address: string
    phone_number: string
    nationality: string
    qualification: string
    kind_of_sport: KindOfSport
    country_name: string
    phone_code: string
    file_name: string
    gender: string
    languages: { name: string }[]
    email: string
    link: string
    background_link: string
    rights_holder_sub: string
    country: {
      country_code: string
    }
  }
}

export interface MediaChannel {
  url: string | null
  media_type: string
  pk: string
}

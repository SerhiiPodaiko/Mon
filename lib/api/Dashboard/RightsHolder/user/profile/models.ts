export type Sportsman = {
  first_name: string
  last_name: string
  email: string
  date_of_birth: string
  address: string
  phone_number: string
  phone_code?: string
  nationality: string
  qualification: string
  kind_of_sport: {
    name: string
    sport_type: string
    pk: string
  }
  country_name: string
  gender: string | null
  languages: Language[] | null
  file_name: string
  link: string | null
  background_file_name: string | null
  background_link: string | null
}

export type Language = {
  name: string
  country_code: string
}

export type VideoType = string

export type VideoTypes = VideoType[]

export type SportsmanPerformanceGalleryFile = string

export interface SportsmanPerformance {
  pk: string
  name: string
  start_date: string
  end_date: string
  position: number
  location: string
  kind_of_sport: {
    pk: string
    name: string
    sport_type: string
  }
  status: string
  description: string
  gallery: SportsmanPerformanceGalleryFile[]
  gallery_files_links: object
}

export interface MediaLibraryVideo {
  title: string
  video_type: 'Interview' | 'Highlights' | 'Award' | 'Training' | 'Vlog' | 'News' | 'Podcast'
  link: string
  pk: string
}

export interface MediaLibraryGallery {
  files: string[]
  pk: string
  gallery_files_links: object
}

export interface MediaLibrary {
  media_library_videos: MediaLibraryVideo[]
  media_library_gallery: MediaLibraryGallery
}

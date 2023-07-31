export type Gallery = {
  files: string[]
  pk: string
  gallery_files_links: object
}

export type Videos = Video[]

export type Video = {
  title: string
  video_type: string
  link: string
  pk: string
}

export type Video = {
  id: string
  title: string
  thumbnail: string
  publish_date: string
  duration: number
}

export type VideosPaginationResponse = {
  results: Video[]
  totalCount: number
}

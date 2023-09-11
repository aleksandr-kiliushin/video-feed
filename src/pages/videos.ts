import type { APIRoute } from "astro"
import { faker } from "@faker-js/faker"

import { FAKE_VIDEOS_COUNT, PAGE_SIZE, VIDEO_TITLES } from "../constants"
import type { Video } from "../types"

const generateTitle = () => VIDEO_TITLES[faker.number.int({ min: 0, max: VIDEO_TITLES.length - 1 })] as string

const videos: Video[] = Array.from({ length: FAKE_VIDEOS_COUNT }, () => ({
  id: faker.string.uuid(),
  title: generateTitle(),
  thumbnail: faker.image.url(),
  publish_date: faker.date.between({ from: "2023-01-01T00:00:00.000Z", to: "2023-09-10T00:00:00.000Z" }).toISOString(),
  duration: faker.number.int({ min: 500, max: 2000 }),
  viewsCount: faker.number.int({ min: 0, max: 100000 }),
  author: {
    name: faker.person.fullName(),
    avatarSrc: faker.image.avatar(),
  },
}))

export const GET: APIRoute = async ({ url }) => {
  const page = Number(url.searchParams.get("page")) || 1
  const searchTerm = url.searchParams.get("searchTerm") || ""
  const sort = url.searchParams.get("sort") || "latest"

  const filteredVideos = videos
    .filter((video) => video.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((videoA, videoB) => {
      if (sort === "latest") {
        return new Date(videoB.publish_date).getTime() - new Date(videoA.publish_date).getTime()
      }
      if (sort === "oldest") {
        return new Date(videoA.publish_date).getTime() - new Date(videoB.publish_date).getTime()
      }
      return 0
    })

  const pageVideos = filteredVideos.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return new Response(
    JSON.stringify({
      results: pageVideos,
      totalCount: filteredVideos.length,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
}

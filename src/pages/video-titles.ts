import type { APIRoute } from "astro"

import { VIDEO_TITLES } from "../constants"

export const GET: APIRoute = async ({ url }) => {
  const searchTerm = url.searchParams.get("searchTerm") || ""

  const videoTitles = VIDEO_TITLES.filter((title) => {
    return title.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return new Response(JSON.stringify(videoTitles), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  })
}

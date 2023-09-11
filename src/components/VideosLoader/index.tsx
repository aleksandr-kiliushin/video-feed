import { createSignal, onMount } from "solid-js"

import { render } from "solid-js/web"

import { PAGE_SIZE } from "../../constants"
import type { VideosPaginationResponse } from "../../types"
import { VideoPreview } from "../VideoPreview"

export const VideosLoader = () => {
  const [currentPage, setCurrentPage] = createSignal(2)

  let spinner: HTMLDivElement

  onMount(() => {
    const loadVideosNextPage = async () => {
      const searchParams = new URLSearchParams(window.location.search)
      const sort = searchParams.get("sort") ?? "latest"
      const searchTerm = searchParams.get("searchTerm") ?? ""

      const nextPageVideosResponse = await fetch(`/videos?page=${currentPage()}&sort=${sort}&searchTerm=${searchTerm}`)
      const nextPageVideos: VideosPaginationResponse = await nextPageVideosResponse.json()
      const videoList = document.querySelector(".video-list")

      if (!(videoList instanceof HTMLUListElement)) {
        return
      }

      nextPageVideos.results.forEach((video) => {
        render(() => <VideoPreview video={video} />, videoList)
      })
      if (nextPageVideos.results.length === PAGE_SIZE) {
        setCurrentPage(currentPage() + 1)
      } else {
        spinner.remove()
      }
    }

    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadVideosNextPage()
        }
      })
    })

    intersectionObserver.observe(spinner)
  })

  return <div class="spinner" ref={spinner} />
}

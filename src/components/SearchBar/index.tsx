import { Show, createResource, createSignal } from "solid-js"
import { debounce } from "../../utils"

import "./index.css"

export const SearchBar = () => {
  const searchParams = new URLSearchParams(window.location.search)
  const initialSearchTerm = searchParams.get("searchTerm") ?? ""
  const initialSort = searchParams.get("sort") ?? "latest"

  const [searchTerm, setSearchTerm] = createSignal(initialSearchTerm)
  const [sort, setSort] = createSignal(initialSort)
  const [isDropdownOpen, setIsDropdownOpen] = createSignal(false)

  const [videoTitles, videoTitlesActions] = createResource(
    searchTerm(),
    async () => {
      const videoTitlesResponse = await fetch(`/video-titles?searchTerm=${searchTerm()}`)
      const videoTitles: string[] = await videoTitlesResponse.json()
      return videoTitles
    },
    { initialValue: [] }
  )

  const debouncedRefetch = debounce(videoTitlesActions.refetch, 500)

  let form: HTMLFormElement

  return (
    <form class="search-bar" ref={form}>
      <div class="search">
        <input
          name="searchTerm"
          type="text"
          value={searchTerm()}
          placeholder="Search ..."
          onInput={(event) => {
            setSearchTerm(event.target.value)
            debouncedRefetch()
          }}
          onFocusIn={() => setIsDropdownOpen(true)}
          onFocusOut={() => {
            setTimeout(() => setIsDropdownOpen(false), 200)
          }}
        />
        <button type="submit" class="search-button">
          <img src="/magnifying-glass.svg" height="20px" width="20px" />
        </button>
        <Show when={isDropdownOpen()}>
          <ul class="suggestions-list">
            {videoTitles().map((videoTitle) => (
              <li
                class="suggestions-list-item"
                onClick={(event) => {
                  setSearchTerm(event.currentTarget.innerText)
                  form?.submit()
                }}
              >
                {videoTitle}
              </li>
            ))}
            {videoTitles().length === 0 && (
              <li class="suggestions-list-item pointer-events-none">No results found ...</li>
            )}
          </ul>
        </Show>
      </div>
      <select
        name="sort"
        value={sort()}
        onChange={(event) => {
          setSort(event.target.value)
          form?.submit()
        }}
      >
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
      </select>
    </form>
  )
}

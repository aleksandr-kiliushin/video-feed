import type { Video } from "../../types"
import { formatDuration, formatTimeAgo } from "../../utils"

import "./index.css"

export const VideoPreview = ({ video }: { video: Video }) => {
  return (
    <li class="video-list-item">
      <img src={video.thumbnail} alt={video.title} width="300px" height="225px" class="video-list-item-image" />
      <div class="duration">{formatDuration(video.duration)}</div>
      <b>{video.title}</b>
      <div class="lightgray-text">{formatTimeAgo(new Date(video.publish_date))}</div>
    </li>
  )
}

export const debounce = (callback: Function, duration: number) => {
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: unknown[]) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => callback(...args), duration)
  }
}

export const formatDuration = (duration: number) => {
  const minutes = Math.floor(duration / 60)
  const seconds = duration % 60
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

export const formatTimeAgo = (date: Date) => {
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""} ago`
  }
  if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`
  }
  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`
  }
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`
  }
  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
  }
  return `${seconds} second${seconds > 1 ? "s" : ""} ago`
}

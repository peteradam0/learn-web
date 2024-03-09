import { queryActiveVideoEvents } from "@/event/api/query/query-video-events"
import { mapToVideoEvent } from "@/event/api/map-to-video-event"

export const getActiveEventsDomain = async (token: string) => {
  const response = await queryActiveVideoEvents(token)
  return mapToVideoEvent(response?.data)
}

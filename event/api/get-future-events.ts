import { queryUpcomingEvents } from "@/event/api/query/query-video-events"
import { mapToVideoEvent } from "@/event/api/map-to-video-event"

export const getFutureEvents = async (token: string) => {
  const response = await queryUpcomingEvents(token)
  return mapToVideoEvent(response?.data)
}

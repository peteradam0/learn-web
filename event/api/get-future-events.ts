import { mapToVideoEvent } from "@/event/api/map-to-video-event"
import { queryUpcomingEvents } from "@/event/api/query/query-video-events"

export const getFutureEvents = async () => {
  const response = await queryUpcomingEvents()
  return mapToVideoEvent(response)
}

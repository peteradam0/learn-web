import { mapToVideoEvent } from "@/event/api/map-to-video-event"
import { queryActiveVideoEvents } from "@/event/api/query/query-video-events"

export const getActiveEvents = async () => {
  const response = await queryActiveVideoEvents()

  return mapToVideoEvent(response)
}

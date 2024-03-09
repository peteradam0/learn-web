import { getUpcomingEvents } from "@/event/api/get-video-events"
import { mapToVideoEvent } from "@/event/api/map-to-video-event"

export const getFutureEvents = async (token: string) => {
  const response = await getUpcomingEvents(token)
  return mapToVideoEvent(response?.data)
}

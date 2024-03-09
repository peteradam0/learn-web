import { getActiveVideoEvents } from "@/event/api/get-video-events"
import { mapToVideoEvent } from "@/event/api/map-to-video-event"

export const getActiveEventsDomain = async (token: string) => {
  const response = await getActiveVideoEvents(token)
  return mapToVideoEvent(response?.data)
}

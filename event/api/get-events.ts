import { mapToVideoEvent } from "@/event/api/map-to-video-event"
import {
  queryActiveVideoEvents,
  queryVideoEvents
} from "@/event/api/query/query-video-events"

export const getActiveEvents = async () => {
  const response = await queryActiveVideoEvents()

  return mapToVideoEvent(response)
}
export const getEvents = async () => {
  const response = await queryVideoEvents()

  return mapToVideoEvent(response)
}

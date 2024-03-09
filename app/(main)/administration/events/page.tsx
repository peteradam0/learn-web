"use client"

import { queryVideoEvents } from "@/event/api/query/query-video-events"
import EventCard from "@/event/ui/event-card"
import { Button, Link } from "@nextui-org/react"
import React, { useEffect, useState } from "react"

export default function EventsPage() {
  const [eventsData, setEventsData] = useState([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    getEventData()
  }, [])

  const getEventData = async () => {
    try {
      const res = await queryVideoEvents()
      setEventsData(res?.data)
    } catch (e) {
      console.log(e)
    }
  }

  if (isLoading) return <p>...</p>

  return (
    <div className="min-h-screen p-6 primaryColor flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <h2 className="font-semibold text-xl text-white pb-1">Events</h2>
        <p className="text-gray-500 mb-6">
          ed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium.
        </p>

        <div style={{ paddingBottom: "20px" }}>
          <Link href="/administration/events/create">
            <Button color="success">Create event</Button>
          </Link>
        </div>
        <div
          className=" rounded shadow-lg p-4 px-4 md:p-8 mb-6"
          style={{ border: "solid #494949 0.0006em" }}
        >
          <div className="container mx-auto py-46 px-8">
            <div className="grid lg:grid-cols-3 gap-4">
              {eventsData.map((ev: any) => (
                <>
                  <EventCard key={ev.description} eventData={ev} />
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

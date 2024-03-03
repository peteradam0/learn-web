import {
  getActiveVideoEvents,
  getUpcomingEvents
} from "@/event/api/get-video-events"
import { Card, CardBody, Divider, ScrollShadow } from "@nextui-org/react"
import { useEffect, useState } from "react"

export default function UpcomingEvents() {
  const [eventData, setEventData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getEventData()
  }, [])

  const getEventData = async () => {
    try {
      const res = await getUpcomingEvents()
      setEventData(res?.data)
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  if (loading) return <p>Loading...</p>
  return (
    <ScrollShadow
      hideScrollBar
      offset={100}
      orientation="horizontal"
      className="max-w-[400px] max-h-[300px]"
    >
      {eventData.map((activeEvent: any) => (
        <div key={activeEvent.imageUrl}>
          <Card className="max-w-none ">
            <CardBody>
              <div className="text-sm text-gray-600 flex items-center">
                <div className="text-gray-900 font-bold mb-1 ml-1 p-1">
                  <div className="flex items-center gap-4 pt-1">
                    <img
                      src={activeEvent.imageUrl}
                      style={{ height: "50px", width: "100px" }}
                    />
                    <div className="font-medium text-white">
                      <div className="text-sm">{activeEvent.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {activeEvent.description}
                      </div>
                      <div className="pt-1">
                        Organized by: {activeEvent.organizer.firstName}{" "}
                        {activeEvent.organizer.lastName}
                      </div>
                      <div className="pt-1 text-white">
                        Date and time: {activeEvent.date}{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
            <Divider />
          </Card>
          <div style={{ paddingTop: "20px" }}></div>
        </div>
      ))}
    </ScrollShadow>
  )
}

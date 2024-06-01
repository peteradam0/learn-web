import { VideoEvent } from "@/event/domain/event"
import { Card, CardBody, Divider, ScrollShadow } from "@nextui-org/react"

export type UpcomingEventsProps = {
  futureEvents: VideoEvent[] | undefined
}

export const UpcomingEvents: React.FC<UpcomingEventsProps> = ({
  futureEvents
}) => {
  const events = futureEvents?.filter(ev => !ev.active)

  return (
    <ScrollShadow
      hideScrollBar
      offset={100}
      orientation="horizontal"
      className="max-w-[400px] max-h-[300px]"
    >
      {events &&
        events.map((activeEvent: any) => (
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

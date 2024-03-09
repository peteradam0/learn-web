"use client"

import { VideoEvent } from "@/event/domain/event"
import { Icon } from "@iconify/react/dist/iconify.js"
import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Link,
  ScrollShadow
} from "@nextui-org/react"
import React from "react"

export type ActiveEventsCardProps = {
  events: VideoEvent[] | undefined
}

export const ActiveEventsCard: React.FC<ActiveEventsCardProps> = ({
  events
}) => {
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
                      <div className="font-medium text-gray-500">
                        <div className="text-sm">{activeEvent.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {activeEvent.description}
                        </div>
                        <div>
                          Organized by: {activeEvent.organizer.firstName}{" "}
                          {activeEvent.organizer.lastName}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
              <Divider />
              <CardFooter>
                <div className="flex flex-wrap gap-4 items-center pl-3">
                  <Link
                    className="text-small"
                    isExternal
                    href={`room/${activeEvent.roomId}`}
                  >
                    <Icon icon={"mdi:video-outline"} width={25} /> Join
                  </Link>
                </div>
              </CardFooter>
            </Card>
            <div style={{ paddingTop: "20px" }}></div>
          </div>
        ))}
    </ScrollShadow>
  )
}

import { startVideoEvent } from "@/event/api/create-event"
import { removeVideoEvent } from "@/event/api/remove-event"

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button
} from "@nextui-org/react"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { Icon } from "@iconify/react/dist/iconify.js"
import { generateRoomId } from "@/livekit/technical/client"

export default function EventCard({ eventData }: any) {
  const [members, setMembers] = useState<string>()
  const router = useRouter()
  useEffect(() => {
    if (eventData.users) {
      eventData.users.map((user: any) => {
        if (members) {
          setMembers(members + " " + user.email)
        } else {
          setMembers("Members: " + user.email)
        }
      })
    }
  }, [])

  const removeEvent = async (eventData: any) => {
    await removeVideoEvent({
      videoData: {
        name: eventData.name,
        organization: eventData.organization
      }
    })
    window.location.reload()
  }

  const startEvent = async () => {
    const roomId = generateRoomId()
    await startVideoEvent({
      videoData: {
        name: eventData.name,
        organization: eventData.organization,
        roomId: roomId
      }
    })
    router.push(`/room/${roomId}`)
  }

  return (
    <Card className="p-2 max-w-[400px]">
      <CardHeader className="flex gap-3">
        <img
          alt="nextui logo"
          height={90}
          src={eventData?.imageUrl}
          width={100}
        />
        <div className="flex flex-col">
          <p className="text-md">{eventData.name}</p>
          <p className="text-xs text-default-500">{eventData.organization}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="text-sm">{eventData.description}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex gap-4 items-center pt-1">
          <Button size="sm" color="success" onClick={() => startEvent()}>
            Start
          </Button>

          <Button
            size="sm"
            color="danger"
            onClick={() => removeEvent(eventData)}
          >
            Close
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

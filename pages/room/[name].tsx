"use client"
import { useRoomOptions } from "@/livekit/domain/roomOptions"
import { decodePassphrase, useServerUrl } from "@/livekit/technical/client"
import "@livekit/components-styles"
import "@livekit/components-styles/prefabs"

import {
  LiveKitRoom,
  VideoConference,
  formatChatMessageLinks,
  useToken,
  LocalUserChoices
} from "@livekit/components-react"
import {
  DeviceUnsupportedError,
  ExternalE2EEKeyProvider,
  Room,
  RoomConnectOptions,
  RoomEvent
} from "livekit-client"

import { useRouter } from "next/router"
import * as React from "react"
import { PreJoinNoSSR } from "@/livekit/ui/pre-join-component"

import { GetServerSideProps } from "next"
import "../../styles/room.css"

import EventSidebar from "@/event/ui/event-sidebar"

import { useCookies } from "react-cookie"

import {
  currentParticipant,
  setCurrentParticipant
} from "@/livekit/api/participant"
import MainHeader from "@/livekit/ui/main-navigation"

export type TokenProps = {
  clerkToken: string
}

export const getServerSideProps: GetServerSideProps = async context => {
  return { props: { clerkToken: context.req.cookies.__session } }
}

const RoomPageContent = ({ clerkToken }: TokenProps) => {
  const router = useRouter()
  const { name: roomName } = router.query
  const [userData, setUserData] = React.useState<any>()
  const [loading, setLoading] = React.useState<boolean>()

  const [preJoinChoices, setPreJoinChoices] = React.useState<
    LocalUserChoices | undefined
  >(undefined)

  React.useEffect(() => {
    setLoading(true)
    if (!clerkToken) router.push("/sign-in")
    currentParticipant(roomName, clerkToken, router, setUserData)
    setLoading(false)
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <main data-lk-theme="default" lang="en" style={{ height: "100%" }}>
      <MainHeader token={clerkToken} router={router} />
      {roomName && !Array.isArray(roomName) && preJoinChoices ? (
        <ActiveRoom
          roomName={roomName}
          userChoices={preJoinChoices}
          onLeave={() => {
            router.push("/")
          }}
        ></ActiveRoom>
      ) : (
        <div
          style={{
            display: "grid",
            placeItems: "center",
            height: "100%",
            paddingTop: "5%"
          }}
        >
          {userData && (
            <PreJoinNoSSR
              onError={err =>
                console.log("error while setting up prejoin", err)
              }
              userLabel="test"
              aria-readonly="true"
              defaults={{
                username: userData.username,
                videoEnabled: true,
                audioEnabled: true
              }}
              onSubmit={(values: LocalUserChoices) => {
                values.username = userData.username
                setPreJoinChoices(values)
              }}
            />
          )}
        </div>
      )}
    </main>
  )
}

export default RoomPageContent

const ActiveRoom = ({ roomName, userChoices, onLeave }: any) => {
  const tokenOptions = React.useMemo(() => {
    return {
      userInfo: {
        identity: userChoices.username,
        name: userChoices.username
      }
    }
  }, [userChoices.username])
  const token = useToken(
    process.env.NEXT_PUBLIC_LK_TOKEN_ENDPOINT,
    roomName,
    tokenOptions
  )

  const router = useRouter()
  const { region, hq, codec } = router.query

  const e2eePassphrase =
    typeof window !== "undefined" &&
    decodePassphrase(location.hash.substring(1))

  const liveKitUrl = useServerUrl(region as string | undefined)

  const worker =
    typeof window !== "undefined" &&
    e2eePassphrase &&
    new Worker(new URL("livekit-client/e2ee-worker", import.meta.url))

  const e2eeEnabled = !!(e2eePassphrase && worker)
  const keyProvider = new ExternalE2EEKeyProvider()
  const roomOptions = useRoomOptions(
    codec,
    e2eeEnabled,
    userChoices,
    hq,
    keyProvider,
    worker
  ) as any

  const [cookies] = useCookies()

  const [participants, setParticipants] = React.useState<any[]>([])
  const [currentUserAdmin, setCurrentUserAdmin] = React.useState()
  const room = React.useMemo(() => new Room(roomOptions), [])

  room.on(RoomEvent.ParticipantConnected, participant => {
    if (
      !(
        participants.filter(e => e.username === participant.identity).length > 0
      )
    ) {
      const newArray: any = participants
      newArray.push({ username: participant.identity, current: false })
      setParticipants(newArray)
    }
  })

  React.useEffect(() => {
    setCurrentParticipant(
      roomName,
      cookies,
      router,
      participants,
      setCurrentUserAdmin,
      setParticipants
    )
  }, [])

  room.on(RoomEvent.ParticipantDisconnected, participant => {
    if (
      participants.filter(e => e.username === participant.identity).length > 0
    ) {
      const newArray: any = participants.filter(
        (part: any) => part.username !== participant.identity
      )
      setParticipants(newArray)
    }
  })

  if (e2eeEnabled) {
    keyProvider.setKey(decodePassphrase(e2eePassphrase))
    room.setE2EEEnabled(true).catch(e => {
      if (e instanceof DeviceUnsupportedError) {
        alert(
          `You're trying to join an encrypted meeting, but your browser does not support it. Please update it to the latest version and try again.`
        )
        console.error(e)
      }
    })
  }
  const connectOptions = React.useMemo((): RoomConnectOptions => {
    return {
      autoSubscribe: true
    }
  }, [])

  return (
    <>
      {liveKitUrl && (
        <div style={{ paddingTop: "2%" }}>
          <EventSidebar
            roomName={roomName}
            participants={participants}
            currentUserAdmin={currentUserAdmin}
          />
          <div style={{ marginLeft: "23%" }}>
            <LiveKitRoom
              style={{ width: "75%", height: "600px" }}
              room={room}
              token={token}
              serverUrl={liveKitUrl}
              connectOptions={connectOptions}
              video={userChoices.videoEnabled}
              audio={userChoices.audioEnabled}
              onDisconnected={onLeave}
            >
              <VideoConference
                style={{ width: "70x" }}
                chatMessageFormatter={formatChatMessageLinks}
              />
            </LiveKitRoom>
          </div>
        </div>
      )}
    </>
  )
}

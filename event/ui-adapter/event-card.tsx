import { startVideoEvent } from "@/event/api-adapter/create-event";
import { removeVideoEvent } from "@/event/api-adapter/remove-event";
import { Button, Card, CardBody, Chip, Tooltip } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function EventCard({ eventData }: any) {
  const [members, setMembers] = useState<string>();
  const router = useRouter();
  useEffect(() => {
    if (eventData.users) {
      eventData.users.map((user: any) => {
        if (members) {
          setMembers(...members, user.email);
        } else {
          setMembers("Members: " + user.email);
        }
      });
    }
  }, []);

  const removeEvent = async (eventData: any) => {
    await removeVideoEvent({
      videoData: {
        name: eventData.name,
        organization: eventData.organization,
      },
    });
    window.location.reload();
  };

  const startEvent = async () => {
    const roomId = uuidv4();
    await startVideoEvent({
      videoData: {
        name: eventData.name,
        organization: eventData.organization,
        roomId: roomId,
      },
    });
    router.push(`/room/${roomId}`);
  };

  return (
    <Card>
      <CardBody>
        <div className="text-sm text-gray-600 flex items-center">
          <div className="text-gray-900 font-bold mb-1 ml-1 p-2">
            <div className="flex items-center gap-4 pt-2">
              <img
                src={eventData?.imageUrl}
                style={{ height: "100px", width: "150px" }}
              />
              <div className="font-medium text-gray-500">
                <div className="text-lg">{eventData.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 pt-3">
                  {eventData.description}
                </div>
                <div className="flex flex-wrap gap-4 items-center pt-3">
                  <Chip size="sm" color="success">
                    {eventData.organization}
                  </Chip>

                  {eventData.active ? (
                    <Chip size="sm" color="success">
                      Active
                    </Chip>
                  ) : (
                    <Chip size="sm" color="danger">
                      Inactive
                    </Chip>
                  )}
                </div>
              </div>
            </div>
            <div
              className="flex flex-wrap gap-4 items-center"
              style={{ paddingTop: "1.5rem" }}
            >
              {!eventData.active && (
                <Button size="sm" color="default" onClick={() => startEvent()}>
                  Start
                </Button>
              )}

              <Button
                size="sm"
                color="danger"
                onClick={() => {
                  removeEvent(eventData);
                }}
              >
                Close
              </Button>
              <div style={{ paddingLeft: "7rem" }}>
                <Tooltip
                  showArrow
                  size="sm"
                  content={
                    members ? members : "No specific members were selected"
                  }
                  classNames={{
                    base: [
                      // arrow color
                      "before:bg-neutral-400 dark:before:bg-white",
                    ],
                    content: ["py-2 px-4 shadow-xl"],
                  }}
                >
                  <Icon icon={"material-symbols:info-outline"} width={25} />
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

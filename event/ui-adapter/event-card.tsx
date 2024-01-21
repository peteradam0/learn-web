import { Button, Card, CardBody, Chip, Tooltip } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

export default function EventCard({ event }: any) {
  const [members, setMembers] = useState<string>();

  useEffect(() => {
    if (event.users) {
      event.users.map((user: any) => {
        if (members) {
          setMembers(...members, user.email);
        } else {
          setMembers(user.email);
        }
      });
    }
  }, []);

  return (
    <Card>
      <CardBody>
        <div className="text-sm text-gray-600 flex items-center">
          <div className="text-gray-900 font-bold mb-1 ml-1 p-2">
            <div className="flex items-center gap-4 pt-2">
              <img
                src={event?.imageUrl}
                style={{ height: "100px", width: "150px" }}
              />
              <div className="font-medium text-gray-500">
                <div className="text-lg">{event.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 pt-3">
                  {event.description}
                </div>
                <div className="flex flex-wrap gap-4 items-center pt-3">
                  <Chip size="sm" color="success">
                    {event.organization}
                  </Chip>

                  {event.active ? (
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
            <div className="flex flex-wrap gap-4 items-center pt-3">
              <Button size="md" color="default">
                Start
              </Button>
              <Tooltip
                showArrow
                content={
                  members ? members : "No specific members were selected"
                }
                placement="right"
                classNames={{
                  base: [
                    // arrow color
                    "before:bg-neutral-400 dark:before:bg-white",
                  ],
                  content: ["py-2 px-4 shadow-xl"],
                }}
              >
                <Button size="md" color="secondary">
                  Members
                </Button>
              </Tooltip>
              <Button size="md" color="danger">
                Delete
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

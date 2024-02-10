"use client";

import { RemoveModal } from "@/livekit/ui-adapter/remove-modal";
import { Tooltip, User, useDisclosure } from "@nextui-org/react";
import React from "react";

export default function EventSidebar({
  participants,
  currentUserAdmin,
  roomName,
}: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <aside
      className="text-white sidebarheight p-4 float-left bg-slate-50"
      style={{ backgroundColor: "#000000", width: "20%" }}
    >
      <nav style={{ paddingLeft: "5%", paddingTop: "2%" }}>
        <ul className="space-y-2">
          <li className="opcion-con-desplegable">
            <ul className="desplegable ml-4 ">
              {participants &&
                Object.entries(participants).map(([key, value]: any) => (
                  <li key={key}>
                    <div className=" p-2 hover:bg-gray-700 flex items-center">
                      {!value.current && currentUserAdmin ? (
                        <Tooltip content="Remove from call">
                          <User
                            name={value.username}
                            description={value.email}
                            onClick={() => {
                              if (!value.current && currentUserAdmin) {
                                onOpen();
                              }
                            }}
                          ></User>
                        </Tooltip>
                      ) : (
                        <User
                          name={value.username}
                          description={value.email}
                        ></User>
                      )}
                    </div>
                    <RemoveModal
                      roomName={roomName}
                      username={value.username}
                      isOpen={isOpen}
                      onOpenChange={onOpenChange}
                    />
                  </li>
                ))}
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

"use client";

import { removeUser } from "@/livekit/api-adapter/remove";
import { Button } from "@nextui-org/react";
import React from "react";

export default function EventSidebar({
  participants,
  currentUserAdmin,
  roomName,
}: any) {
  console.log("123", participants);
  return (
    <aside
      className="text-white sidebarheight p-4 float-left bg-slate-50"
      style={{ backgroundColor: "#000000", width: "20%" }}
    >
      <nav>
        <ul className="space-y-2">
          <li className="opcion-con-desplegable">
            <ul className="desplegable ml-4 ">
              {participants &&
                Object.entries(participants).map(([key, value]: any) => (
                  <li key={key}>
                    <div className=" p-2 hover:bg-gray-700 flex items-center">
                      {value.username}
                      {!value.current && currentUserAdmin && (
                        <div>
                          <Button
                            onClick={async () =>
                              removeUser(roomName, value.username)
                            }
                          >
                            Remove
                          </Button>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

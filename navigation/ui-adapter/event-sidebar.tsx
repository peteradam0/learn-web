"use client";

import React from "react";

export default function EventSidebar({ participants, currentUserAdmin }: any) {
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
              {currentUserAdmin && " the current user is an admin user"}
              {participants &&
                Object.entries(participants).map(([key, value]: any) => (
                  <li key={key}>
                    <div className=" p-2 hover:bg-gray-700 flex items-center">
                      {value.username}
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

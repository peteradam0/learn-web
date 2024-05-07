"use client"

import Link from "next/link"

export default function SidebarContent() {
  return (
    <aside
      className="text-white w-30 sidebarheight p-4 float-left primaryBackGround"
      style={{ width: "20%" }}
    >
      <nav>
        <ul className="space-y-2">
          <li className="opcion-con-desplegable">
            <ul className="desplegable ml-4 ">
              <li>
                <Link
                  href="/administration/events"
                  className=" p-2 hover:bg-gray-700 flex items-center"
                >
                  Events
                </Link>
              </li>

              <li>
                <Link
                  href="/administration/courses"
                  className=" p-2 hover:bg-gray-700 flex items-center"
                >
                  Courses
                </Link>
              </li>

              <li>
                <Link
                  href="/administration/users"
                  className=" p-2 hover:bg-gray-700 flex items-center"
                >
                  Users
                </Link>
              </li>
              <li>
                <Link
                  href="/administration/organizations"
                  className=" p-2 hover:bg-gray-700 flex items-center"
                >
                  Organizations
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

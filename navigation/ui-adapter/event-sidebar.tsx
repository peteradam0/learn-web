"use client";

import Link from "next/link";
import React from "react";
import useNavigation from "./use-navigation";
import { usePathname, useRouter } from "next/navigation";

type SidebarContetProp = {
  isAdmin: boolean;
};

export default function EventSidebar({ isAdmin }: SidebarContetProp) {
  return (
    <aside
      className="text-white sidebarheight p-4 float-left bg-slate-50"
      style={{ backgroundColor: "#000000", width: "20%" }}
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
                  href="/courses"
                  className=" p-2 hover:bg-gray-700 flex items-center"
                >
                  Explore Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/administration/courses"
                  className=" p-2 hover:bg-gray-700 flex items-center"
                >
                  MyCourses
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
  );
}

"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useNavigation from "./hooks/use-navigation";
import { usePathname, useRouter } from "next/navigation";

type SidebarContetProp = {
  isAdmin: boolean;
};

export default function SidebarContent({ isAdmin }: SidebarContetProp) {
  const {
    isHomeActive,
    isDashboardActive,
    isMyCoursesActive,
    isAnalyticsActive,
  } = useNavigation();

  const pathname = usePathname();

  return (
    <aside
      className="text-white w-64 sidebarheight p-4 float-left bg-slate-50"
      style={{ backgroundColor: "#14151f" }}
    >
      <nav>
        <ul className="space-y-2">
          <li className="opcion-con-desplegable">
            <div className="flex items-center justify-between p-2 hover:bg-gray-700">
              <div className="flex items-center">
                <span>Home</span>
              </div>
            </div>
            <ul className="desplegable ml-4 ">
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
                  href="/"
                  className=" p-2 hover:bg-gray-700 flex items-center"
                >
                  Explore
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
                  href="/administration/integration"
                  className=" p-2 hover:bg-gray-700 flex items-center"
                >
                  Canvas LMS
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

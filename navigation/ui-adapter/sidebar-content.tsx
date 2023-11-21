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
    <aside className="bg-gray-950 text-white w-64 sidebarheight p-4 float-left">
      <nav>
        <ul className="space-y-2">
          <li className="opcion-con-desplegable">
            <div className="flex items-center justify-between p-2 hover:bg-gray-700">
              <div className="flex items-center">
                <span>Home</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-gray-700">
              <div className="flex items-center">
                <span>Administration</span>
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
                  href="/dashboard"
                  className=" p-2 hover:bg-gray-700 flex items-center"
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  href="/administration/analytics"
                  className=" p-2 hover:bg-gray-700 flex items-center"
                >
                  Analytics
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

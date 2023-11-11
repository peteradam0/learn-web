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
  const router = useRouter();

  const isAdminPage = pathname.startsWith("/administration");

  return (
    <div className="flex-col space-y-4 items-center py-8 pl-1 sm:flex h-full w-[120px] md:w-[250px] md:items-start fixed">
      <Link
        href="/"
        className="flex flex-row space-x-1 items-center p-4 rounded-full duration-200"
      >
        <Image alt="test" src="/favicon.ico" width="70" height="70" />
      </Link>
      {!isAdminPage && (
        <>
          <Link
            href="/"
            className="flex flex-row space-x-4 items-center px-4 py-3 rounded-full duration-200  relative"
          >
            {isHomeActive ? (
              <Icon icon="mingcute:home-5-fill" width="32" height="32" />
            ) : (
              <Icon icon="mingcute:home-5-line" width="32" height="30" />
            )}
            <span
              className={`text-2xl p-2 hidden md:flex ${
                isHomeActive ? "font-bold" : ""
              }`}
            >
              Home
            </span>
          </Link>
          <Link
            href="/dashboard"
            className="flex flex-row space-x-4 items-center px-4 py-3 rounded-full duration-200 "
          >
            {isDashboardActive ? (
              <Icon
                icon="material-symbols:dashboard"
                width="32"
                height="32"
                className="stroke-current stroke-5"
              />
            ) : (
              <Icon icon="material-symbols:dashboard" width="30" height="30" />
            )}
            <span
              className={`text-2xl p-2 hidden md:flex ${
                isDashboardActive ? "font-bold" : ""
              }`}
            >
              Explore
            </span>
          </Link>
        </>
      )}
      {isAdminPage && (
        <>
          <Link
            href="/administration/courses"
            className="flex flex-row space-x-4 items-center px-4 py-3 rounded-full duration-200 "
          >
            {isMyCoursesActive ? (
              <Icon
                icon="fluent:learning-app-24-filled"
                width="32"
                height="32"
                className="stroke-current stroke-5"
              />
            ) : (
              <Icon
                icon="fluent:learning-app-24-regular"
                width="30"
                height="30"
              />
            )}
            <span
              className={`text-2xl p-2 hidden md:flex ${
                isMyCoursesActive ? "font-bold" : ""
              }`}
            >
              My Courses
            </span>
          </Link>
          <Link
            href="/administration/analytics"
            className="flex flex-row space-x-4 items-center px-4 py-3 rounded-full duration-200 "
          >
            {isAnalyticsActive ? (
              <Icon
                icon="ic:baseline-analytics"
                width="32"
                height="32"
                className="stroke-current stroke-5"
              />
            ) : (
              <Icon icon="ic:outline-analytics" width="30" height="30" />
            )}
            <span
              className={`text-2xl p-2 hidden md:flex ${
                isAnalyticsActive ? "font-bold" : ""
              }`}
            >
              Analytics
            </span>
          </Link>
        </>
      )}
    </div>
  );
}

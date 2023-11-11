"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Card, CardBody } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const links = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "dashboard",
    path: "/dashboard",
  },
  {
    name: "profile",
    path: "/profile",
  },
];

export default function SidebarContent() {
  return (
    <div className="flex-col space-y-4 items-center py-8 pl-1 sm:flex h-full  w-[120px] md:w-[250px] md:items-start fixed">
      <Link
        href="/"
        className="flex flex-row space-x-1 items-center p-4 rounded-full duration-200"
      >
        <p className="p-2 font-bold text-inherit">LOGO</p>
      </Link>

      <Link
        href="/"
        className="flex flex-row space-x-4 items-center px-4 py-3 rounded-full duration-200  relative"
      >
        <Icon icon="mingcute:home-5-fill" width="30" height="30" />

        <span className={`text-2xl p-2 md:flex ${true ? "font-bold" : ""}`}>
          Home
        </span>
      </Link>
      <Link
        href="/explore"
        className="flex flex-row space-x-4 items-center px-4 py-3 rounded-full duration-200 "
      >
        <Icon
          icon="uil:search"
          width="32"
          height="32"
          className="stroke-current stroke-5"
        />
        <span className={`text-2xl p-2 md:flex ${true ? "font-bold" : ""}`}>
          Explore
        </span>
      </Link>
      <Link
        href="/notifications"
        className="flex flex-row space-x-4 items-center px-4 py-3 rounded-full duration-200 "
      >
        <Icon icon="mingcute:notification-fill" width="30" height="30" />
        <span className={`text-2xl p-2 md:flex ${true ? "font-bold" : ""}`}>
          Notifications
        </span>
      </Link>
      <Link
        href="/messages"
        className="flex flex-row space-x-4 items-center px-4 py-3 rounded-full duration-200"
      >
        <Icon icon="ic:baseline-email" width="30" height="30" />
        <span className={`text-2xl p-2 md:flex ${true ? "font-bold" : ""}`}>
          Messages
        </span>
      </Link>
    </div>
  );
}

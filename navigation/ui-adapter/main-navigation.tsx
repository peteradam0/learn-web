"use client";

import React from "react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  Button,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { UserButton } from "@clerk/nextjs";

import Image from "next/image";

type MainHeaderPorps = {
  isAdmin: boolean;
};

export default function MainHeader({ isAdmin }: MainHeaderPorps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { name: "MyCourses", url: "/administration/courses" },
    { name: "Analytics", url: "/administration/analytics" },
  ];

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarMenuToggle
        style={{ float: "left" }}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      />
      <NavbarContent className="" justify="start">
        <NavbarItem className="">
          <Link
            href="/"
            className="flex flex-row space-x-1 items-center p-4 rounded-full duration-200"
          >
            <Image alt="test" src="/favicon.ico" width="35" height="35" />
          </Link>
        </NavbarItem>
        <NavbarItem className="lg:flex ">
          <Link className="text-white" href="/dashboard">
            Dashboard
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className=" lg:flex">
          <Link className="text-white" href="#">
            What to learn?
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="warning" href="#" variant="flat">
            Admin
          </Button>
        </NavbarItem>
        <NavbarItem className="p-4">
          <UserButton afterSignOutUrl="/" />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href={item.url}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

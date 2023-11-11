"use client";

import React from "react";
import { Navbar, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import { UserButton } from "@clerk/nextjs";
import ThemeRadioButton from "./theme-switch";
import { usePathname } from "next/navigation";

type MainHeaderPorps = {
  isAdmin: boolean;
};

export default function MainHeader({ isAdmin }: MainHeaderPorps) {
  const pathname = usePathname();

  const isAdminPage = pathname.startsWith("/administration");
  return (
    <Navbar className="border-b">
      <NavbarContent justify="center">
        <NavbarItem>
          <Link color="foreground" href="#"></Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {!isAdminPage && isAdmin && (
          <NavbarItem>
            <Link color="foreground" href="/administration/courses">
              Administration
            </Link>
          </NavbarItem>
        )}

        {isAdminPage && isAdmin && (
          <NavbarItem>
            <Link color="foreground" href="/dashboard">
              Exit
            </Link>
          </NavbarItem>
        )}

        <NavbarItem>
          <ThemeRadioButton />
        </NavbarItem>
        <NavbarItem className="p-4">
          <UserButton afterSignOutUrl="/" />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

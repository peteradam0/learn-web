"use client";

import React from "react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarBrand,
  Button,
  NavbarMenu,
  NavbarMenuItem,
  Input,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { UserButton } from "@clerk/nextjs";
import ThemeRadioButton from "./theme-switch";
import { usePathname } from "next/navigation";

type MainHeaderPorps = {
  isAdmin: boolean;
};

export default function MainHeader({ isAdmin }: MainHeaderPorps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const isAdminPage = pathname.startsWith("/administration");

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
      <NavbarContent className="" justify="start"></NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className=" lg:flex">
          <Link href="#">What to learn?</Link>
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

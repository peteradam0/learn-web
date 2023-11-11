import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import { UserButton } from "@clerk/nextjs";
import ThemeRadioButton from "./theme-switch";

export default function MainHeader() {
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">LOGO</p>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Link color="foreground" href="#"></Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
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

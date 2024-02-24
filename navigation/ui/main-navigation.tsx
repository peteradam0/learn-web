"use client";

import React, { useEffect, useState } from "react";
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
import { getUserData } from "@/common/api-adapter/get-user-data";

export default function MainHeader() {
  const [userData, setUserData] = useState<any>();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    setLoading(true);
    getData();
    setLoading(false);
  }, []);

  const getData = async () => {
    try {
      const res = await getUserData();
      setUserData(res?.data);
    } catch (e) {
      console.log(e);
    }
  };

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { name: "Home", url: "/" },
    { name: "Courses", url: "/courses" },
    { name: "My Courses", url: "/courses/mycourses" },
    { name: "Admin", url: "/administration/courses" },
  ];

  if (loading) return <div>Loading...</div>;

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
          <Link className="text-white" href="/">
            Dashboard
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {userData && userData.userRole === "ADMIN" && (
            <Button
              as={Link}
              color="warning"
              href="/administration/courses"
              variant="flat"
            >
              Admin
            </Button>
          )}
        </NavbarItem>
        <NavbarItem className="p-4">
          <UserButton afterSignOutUrl="/" />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            {item.name === "Admin" &&
            userData &&
            userData.userRole === "ADMIN" ? (
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
            ) : (
              <div></div>
            )}
            {item.name !== "Admin" && (
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
            )}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

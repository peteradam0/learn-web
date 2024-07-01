"use client"

import { User } from "@/common/domain/user"
import { UserButton } from "@clerk/nextjs"
import {
  Button,
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle
} from "@nextui-org/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"

export type NavigationBarProps = {
  userData: User
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ userData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCanvasTokenPresent, setIsCanvasTokenPresent] = useState(false);

  useEffect(() => {
    
    const checkCookie = () => {
    const cookie = Cookies.get('canvas_token');
    setIsCanvasTokenPresent(!!cookie);
  }
    checkCookie();
    
    const intervalId = setInterval(checkCookie, 5000);
    console.log(isCanvasTokenPresent)
    return () => clearInterval(intervalId);

  },[])

  const menuItems = [
    { name: "Home", url: "/" },
    { name: "Explore Courses", url: "/courses" },
    { name: "My Courses", url: "/courses/mycourses" },
    { name: "About", url: "/about" },
    { name: "Admin", url: "/administration/courses" }
  ]

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarMenuToggle
        style={{ float: "left" }}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      />
      <NavbarContent justify="start">
        <NavbarItem>
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
        <NavbarItem>
        {isCanvasTokenPresent && <Button color="success" variant="flat">Canvas LMS</Button>}
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
  )
}

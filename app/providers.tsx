"use client";

import { SocketProvider } from "@/room/context/socket";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { FunctionComponent, ReactNode } from "react";

type ProvidersProps = {
  children: ReactNode;
};

export const Providers: FunctionComponent<ProvidersProps> = ({ children }) => {
  return (
    <NextUIProvider>
      <ThemeProvider attribute="class">
        <SocketProvider>{children}</SocketProvider>
      </ThemeProvider>
    </NextUIProvider>
  );
};

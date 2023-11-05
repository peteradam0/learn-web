"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/react";
import { FunctionComponent, ReactNode } from "react";

type PageContextProps = {
  children: ReactNode;
};

const PageContextProviders: FunctionComponent<PageContextProps> = ({
  children,
}) => {
  return (
    <ClerkProvider>
      <NextUIProvider>
        <div>{children}</div>
      </NextUIProvider>
    </ClerkProvider>
  );
};

export default PageContextProviders;

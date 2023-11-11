"use client";
import { NextUIProvider } from "@nextui-org/react";
import { FunctionComponent, ReactNode } from "react";

type PageContextProps = {
  children: ReactNode;
};

const PageProviders: FunctionComponent<PageContextProps> = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default PageProviders;

import { ClerkProvider } from "@clerk/nextjs";
import exp from "constants";
import { FunctionComponent, ReactNode } from "react";

type PageContextProps = {
  children: ReactNode;
};

const PageContextProviders: FunctionComponent<PageContextProps> = ({
  children,
}) => {
  return (
    <ClerkProvider>
      <div>{children}</div>
    </ClerkProvider>
  );
};

export default PageContextProviders;

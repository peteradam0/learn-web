import { UserButton } from "@clerk/nextjs";
import Button from "./bounded-contexts/common-bounded-context/ui-adapter/button";
import PageContextProviders from "./page-context-providers";
import MainHeader from "./bounded-contexts/common-bounded-context/ui-adapter/main-navigation";

export default function Home() {
  return (
    <PageContextProviders>
      <MainHeader />
      <UserButton afterSignOutUrl="/" />
      <Button apiBaseUrl={process.env.API_BASE_URL} />
    </PageContextProviders>
  );
}

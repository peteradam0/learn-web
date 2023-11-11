import { UserButton } from "@clerk/nextjs";
import Button from "../common/ui-adapter/button";
import PageContextProviders from "./page-context-providers";
import MainHeader from "../common/ui-adapter/main-navigation";

export default function Home() {
  return (
    <PageContextProviders>
      <MainHeader />
      <UserButton afterSignOutUrl="/" />
      <Button apiBaseUrl={process.env.API_BASE_URL} />
    </PageContextProviders>
  );
}

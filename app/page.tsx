import { UserButton } from "@clerk/nextjs";
import Button from "./bounded-contexts/common-bounded-context/ui-adapter/button";

export default function Home() {
  return (
    <main>
      <UserButton afterSignOutUrl="/" />
      <Button apiBaseUrl={process.env.API_BASE_URL} />
    </main>
  );
}

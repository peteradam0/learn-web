import Button from "../../common/ui-adapter/button";
import MainHeader from "../../common/ui-adapter/main-navigation";
import PageProviders from "../page-providers";

export default function Home() {
  return (
    <>
      <PageProviders>
        <MainHeader />
        <Button />
      </PageProviders>
    </>
  );
}

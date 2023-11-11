import MainHeader from "@/common/ui-adapter/main-navigation";
import SidebarContent from "@/common/ui-adapter/sidebar-content";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <div className="md:flex hidden w-60 z-20 flex-col fixed inset-y-0 border-r">
        <SidebarContent isAdmin={true} />
      </div>
      <main className="h-full md:pl-60">
        <MainHeader />
        <div>{children}</div>
      </main>
    </div>
  );
}

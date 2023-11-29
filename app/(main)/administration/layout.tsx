import MainHeader from "@/navigation/ui-adapter/main-navigation";
import SidebarContent from "@/navigation/ui-adapter/sidebar-content";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <MainHeader isAdmin={false} />
      <main>
        <SidebarContent isAdmin={false} />
      </main>
      <div style={{ marginLeft: "255px" }}>{children}</div>
    </div>
  );
}

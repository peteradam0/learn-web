import MainNavigation from "@/navigation/ui/main-navigation"
import SidebarContent from "@/navigation/ui/sidebar-content"

export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <MainNavigation />
      <SidebarContent />
      <div
        style={{
          marginLeft: "20%",
          borderLeft: "solid #494949 0.0006em",
          paddingBottom: "2rem"
        }}
      >
        {children}
      </div>
    </div>
  )
}

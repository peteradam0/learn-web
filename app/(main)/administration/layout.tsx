import MainNavigation from "@/common/ui/main-navigation"
import SidebarContent from "@/common/ui/sidebar-content"

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

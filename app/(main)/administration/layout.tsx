import SidebarContent from "@/navigation/ui/sidebar-content"

export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <SidebarContent />
      <div style={{ marginLeft: "20%" }}>{children}</div>
    </div>
  )
}

import MainNavigation from "@/common/ui/main-navigation"
import "@livekit/components-styles"
import "@livekit/components-styles/prefabs"
export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <MainNavigation />
      <div>{children}</div>
    </div>
  )
}

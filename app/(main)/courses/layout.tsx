import MainHeader from "@/navigation/ui/main-navigation"
import "@livekit/components-styles"
import "@livekit/components-styles/prefabs"
export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <MainHeader />
      <div>{children}</div>
    </div>
  )
}

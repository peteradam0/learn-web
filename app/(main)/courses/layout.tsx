import { Footer } from "@/navigation/ui/footer"
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
      <div style={{ paddingBottom: "4rem" }}>{children}</div>
      <Footer />
    </div>
  )
}

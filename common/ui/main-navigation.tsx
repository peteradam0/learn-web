import { getUserData } from "@/common/api/get-user-data"
import { NavigationBar } from "@/common/ui/navigation-bar"

export default async function MainNavigation() {
  const user = await getUserData()

  return <NavigationBar userData={user} />
}

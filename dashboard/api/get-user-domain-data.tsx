import { getUserData } from "@/common/api/get-user-data"
import { mapToUser } from "@/common/api/map-to-user"

export const getUserDomainData = async () => {
  const response = await getUserData()
  return mapToUser(response?.data)
}

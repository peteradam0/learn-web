import { queryUserData } from "@/common/api/query/query-user-data"
import { mapToUser } from "@/common/api/map-to-user"

export const getUserData = async () => {
  const response = await queryUserData()
  return mapToUser(response?.data)
}

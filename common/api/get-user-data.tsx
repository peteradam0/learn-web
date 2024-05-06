import { queryUserData } from "@/common/api/query/query-user-data"
import { mapToUser } from "@/common/api/mapping/map-to-user"

export const getUserData = async () => {
  const response = await queryUserData()
  return mapToUser(response)
}

import { User } from "@/common/domain/user"

export const mapToUser = (apiData: any): User => {
  if (!apiData.userRole) throw new Error("User has no role")

  const userRole = apiData.userRole
  return {
    userRole
  }
}

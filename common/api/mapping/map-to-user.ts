import { User } from "@/common/domain/user"

export const mapToUser = (apiData: any): User => {
  if (!apiData.username) throw new Error("user has no username")

  const username = apiData.username
  return {
    username
  }
}

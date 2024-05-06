import { executeAuthorizedFetchQuery } from "@/common/api/query/execute-authorized-fetch-query"
import { queryToken } from "@/common/api/query/get-user-token"
import { redirect } from "next/navigation"
import qs from "query-string"

export const queryUserData = async () => {
  const token = await queryToken()
  if (!token) {
    redirect("/")
  }

  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user`
  })
  return executeAuthorizedFetchQuery(url, token)
}

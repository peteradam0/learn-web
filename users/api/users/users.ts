import { executeAuthorizedDeleteQuery } from "@/common/api/query/execute-authorized-delete-query"
import { executeAuthorizedFetchQuery } from "@/common/api/query/execute-authorized-fetch-query"
import { queryToken } from "@/common/api/query/get-user-token"
import qs from "query-string"

export const queryUsers = async () => {
  const token = await queryToken()

  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`
  })

  return executeAuthorizedFetchQuery(url, token)
}

export const queryUser = async () => {
  const token = await queryToken()

  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user`
  })

  return executeAuthorizedFetchQuery(url, token)
}

export const queryDeleteUser = async (userId: string) => {
  const token = await queryToken()

  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}`
  })

  return executeAuthorizedDeleteQuery(url, token)
}

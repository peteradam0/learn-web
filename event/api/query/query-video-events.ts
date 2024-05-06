import { executeAuthorizedFetchQuery } from "@/common/api/query/execute-authorized-fetch-query"
import { queryToken } from "@/common/api/query/get-user-token"
import qs from "query-string"

export const queryVideoEvents = async () => {
  const token = await queryToken()

  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/events`
  })

  return executeAuthorizedFetchQuery(url, token)
}

export const queryActiveVideoEvents = async () => {
  const token = await queryToken()

  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/active`
  })
  return executeAuthorizedFetchQuery(url, token)
}

export const queryUpcomingEvents = async () => {
  const token = await queryToken()

  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/upcoming`
  })
  return executeAuthorizedFetchQuery(url, token)
}

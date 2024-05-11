import { executeAuthorizedCreateQuery } from "@/common/api/query/execute-authorized-create-query"
import { executeAuthorizedFetchQuery } from "@/common/api/query/execute-authorized-fetch-query"
import { queryToken } from "@/common/api/query/get-user-token"
import qs from "query-string"

export const queryCoursePartitipation = async (courseId: string) => {
  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${courseId}/participation`
  })

  const token = await queryToken()
  return executeAuthorizedFetchQuery(url, token)
}

export const queryCreateCoursePartitipation = async (courseId: string) => {
  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${courseId}/participation`
  })

  const token = await queryToken()

  return executeAuthorizedCreateQuery(url, token, {})
}

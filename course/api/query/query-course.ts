import { executeAuthorizedCreateQuery } from "@/common/api/query/execute-authorized-create-query"
import { executeAuthorizedDeleteQuery } from "@/common/api/query/execute-authorized-delete-query"
import { executeAuthorizedFetchQuery } from "@/common/api/query/execute-authorized-fetch-query"
import { executeAuthorizedUpdateQuery } from "@/common/api/query/execute-authorized-update-query"
import { queryToken } from "@/common/api/query/get-user-token"
import qs from "query-string"

export const queryCourseData = async (courseId: string) => {
  const token = await queryToken()
  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${courseId}`
  })

  return executeAuthorizedFetchQuery(url, token)
}
export const queryNotInProgressCourseData = async () => {
  const token = await queryToken()

  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/not-in-progress`
  })

  return executeAuthorizedFetchQuery(url, token)
}
export const queryInProgressCourseData = async () => {
  const token = await queryToken()

  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/in-progress`
  })
  return executeAuthorizedFetchQuery(url, token)
}
export const queryCourses = async () => {
  const token = await queryToken()
  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses`
  })

  return executeAuthorizedFetchQuery(url, token)
}
export const queryCreateCourses = async (createCourseData: any) => {
  const token = await queryToken()
  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses`
  })

  return executeAuthorizedCreateQuery(url, token, createCourseData)
}

export const queryRemoveCourse = async (courseId: string) => {
  const token = await queryToken()

  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${courseId}`
  })

  return executeAuthorizedDeleteQuery(url, token)
}

export const querySelfCourses = async () => {
  const token = await queryToken()

  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/self`
  })

  return executeAuthorizedFetchQuery(url, token)
}
export const queryUpdateCourse = async (updateCourseData: any) => {
  const token = await queryToken()
  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses`
  })

  return executeAuthorizedUpdateQuery(url, token, updateCourseData)
}

export const queryAdminCourses = async () => {
  const token = await queryToken()
  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/administration/courses`
  })

  return executeAuthorizedFetchQuery(url, token)
}
export const queryUpdateChapter = async (courseId: string) => {
  const token = await queryToken()

  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${courseId}`
  })

  return executeAuthorizedUpdateQuery(url, token, {})
}

export const queryCompleteChapter = async (
  courseId: string,
  chapterId: string,
  token: string
) => {
  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${courseId}/chapter/${chapterId}/participation`
  })

  return executeAuthorizedCreateQuery(url, token, {})
}

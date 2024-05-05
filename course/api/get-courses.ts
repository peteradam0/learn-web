import { mapToCourse, mapToCourses } from "@/course/api/mapping/map-to-courses"
import {
  queryCourseData,
  queryInProgressCourseData,
  queryNotInProgressCourseData,
  querySelfCourses
} from "@/course/api/query/query-course"

export const getCourse = async (token: string | null, courseId: string) => {
  if (!token) return
  const response = await queryCourseData(token, courseId)

  return mapToCourse(response?.data)
}

export const getCourses = async (token: string | null) => {
  if (!token) return
  const response = await querySelfCourses(token)

  return mapToCourses(response?.data)
}

export const getInProgressCourses = async (token: string | null) => {
  if (!token) return
  const response = await queryInProgressCourseData(token)

  return mapToCourses(response?.data)
}

export const getNotInProgressCourses = async (token: string | null) => {
  if (!token) return
  const response = await queryNotInProgressCourseData(token)

  return mapToCourses(response?.data)
}

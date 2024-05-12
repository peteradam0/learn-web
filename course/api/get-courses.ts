import { mapToCourse, mapToCourses } from "@/course/api/mapping/map-to-courses"
import {
  queryAdminCourses,
  queryCourseData,
  queryInProgressCourseData,
  queryNotInProgressCourseData,
  querySelfCourses
} from "@/course/api/query/query-course"

export const getCourse = async (courseId: string) => {
  const response = await queryCourseData(courseId)

  return mapToCourse(response)
}

export const getCourses = async () => {
  const response = await querySelfCourses()

  return mapToCourses(response)
}

export const getAdminCourses = async () => {
  const response = await queryAdminCourses()

  return response
}

export const getInProgressCourses = async () => {
  const response = await queryInProgressCourseData()

  return response
}

export const getNotInProgressCourses = async () => {
  const response = await queryNotInProgressCourseData()

  return mapToCourses(response)
}

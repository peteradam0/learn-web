import { queryInProgressCourseData } from "@/course/api/query/query-course-data"
import { mapToCourse } from "@/course/api/map-to-courses"

export const getInProgressCourse = async (token: string | null) => {
  if (!token) return
  const response = await queryInProgressCourseData(token)

  return mapToCourse(response?.data)
}

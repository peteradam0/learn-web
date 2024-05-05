import { mapToCourse } from "@/course/api/mapping/map-to-courses"
import { queryInProgressCourseData } from "@/course/api/query/query-course"

export const getInProgressCoursesData = async (token: string | null) => {
  if (!token) return
  const response = await queryInProgressCourseData(token)

  return mapToCourse(response?.data)
}

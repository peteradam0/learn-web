import { mapToCourse } from "@/course/api/map-to-courses"
import { queryInProgressCourseData } from "@/course/api/query/query-course-data"

export const getInProgressCoursesData = async (token: string | null) => {
  if (!token) return
  const response = await queryInProgressCourseData(token)

  return mapToCourse(response?.data)
}

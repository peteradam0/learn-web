import { mapToCourse } from "@/course/api/map-to-course"
import { queryCourseData } from "@/course/api/query/query-course-data"

export const getCourseDomain = async (
  token: string | null,
  courseId: string
) => {
  if (!token) return
  const response = await queryCourseData(token, courseId)

  return mapToCourse(response?.data)
}

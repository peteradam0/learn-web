import { mapToCourse } from "@/course/api/mapping/map-to-course"
import { queryCourseData } from "@/course/api/query/query-course"

export const getCourse = async (token: string | null, courseId: string) => {
  if (!token) return
  const response = await queryCourseData(token, courseId)

  return mapToCourse(response?.data)
}

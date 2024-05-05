import { mapToCourse } from "@/course/api/mapping/map-to-courses"
import { querySelfCourses } from "@/course/api/query/query-course"

export const getCourses = async (token: string | null) => {
  if (!token) return
  const response = await querySelfCourses(token)

  return mapToCourse(response?.data)
}

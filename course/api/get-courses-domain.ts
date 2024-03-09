import { mapToCourse } from "@/course/api/map-to-course"
import { querySelfCourses } from "@/course/api/query/query-self-courses"

export const getCourseDomain = async (token: string | null) => {
  if (!token) return
  const response = await querySelfCourses(token)

  return mapToCourse(response?.data)
}

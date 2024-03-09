import { mapToCourse } from "@/course/api/map-to-courses"
import { querySelfCourses } from "@/course/api/query/query-self-courses"

export const getCoursesDomain = async (token: string | null) => {
  if (!token) return
  const response = await querySelfCourses(token)

  return mapToCourse(response?.data)
}

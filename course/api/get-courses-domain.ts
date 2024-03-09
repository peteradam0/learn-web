import { mapToCourse } from "@/course/api/map-to-course"
import { getSelfCourses } from "@/dashboard/api/get-published-courses"

export const getCourseDomain = async (token: string | null) => {
  if (!token) return
  const response = await getSelfCourses(token)

  return mapToCourse(response?.data)
}

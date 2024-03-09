import { getInProgressCourses } from "@/course/api/get-course"
import { mapToCourse } from "@/course/api/map-to-course"

export const getInProgressCourseDomain = async (token: string | null) => {
  if (!token) return
  const response = await getInProgressCourses(token)

  return mapToCourse(response?.data)
}

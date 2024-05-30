import { mapToCourses } from "@/course/api/mapping/map-to-courses"
import { querySelfCourses } from "@/course/api/query/query-course"
import { queryCoursePartitipation } from "@/course/api/query/query-course-participation"

export const getCourseParticipation = async (courseId: string) => {
  return await queryCoursePartitipation(courseId)
}

export const getCourses = async () => {
  const response = await querySelfCourses()

  return mapToCourses(response)
}

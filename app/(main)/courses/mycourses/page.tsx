import { queryToken } from "@/common/api/query/get-user-token"
import { getInProgressCourses } from "@/course/api/get-courses"

import { MyCoursesPage } from "@/course/ui/my-courses-page"

export default async function MyCoursesPageRoute() {
  const token = await queryToken()
  if (!token) return
  const inProgressCourseData = await getInProgressCourses(token)

  return <MyCoursesPage courses={inProgressCourseData} />
}

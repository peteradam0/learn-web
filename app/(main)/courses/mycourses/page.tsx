import { queryToken } from "@/common/api/query/get-user-token"
import { getInProgressCoursesData } from "@/course/api/get-in-progress-courses"
import { MyCoursesPage } from "@/course/ui/my-courses-page"

export default async function MyCoursesPageRoute() {
  const token = await queryToken()
  if (!token) return
  const inProgressCourseData = await getInProgressCoursesData(token)

  return <MyCoursesPage courses={inProgressCourseData} />
}

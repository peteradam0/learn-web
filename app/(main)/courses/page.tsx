import { getCourses } from "@/course/api/get-courses-domain"
import { queryToken } from "@/common/api/query/get-user-token"
import { CoursesPage } from "@/course/ui/courses-page"

export default async function CoursePageRoute() {
  const token = await queryToken()
  if (!token) return
  const courses = await getCourses(token)

  return (
    <>
      <CoursesPage courses={courses} />
    </>
  )
}

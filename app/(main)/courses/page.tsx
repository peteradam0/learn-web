import { getCoursesDomain } from "@/course/api/get-courses-domain"
import { queryToken } from "@/course/api/query/get-user-token"
import { CoursesPage } from "@/course/ui/courses-page"

export default async function CoursePageRoute() {
  const token = await queryToken()
  if (!token) return
  const courses = await getCoursesDomain(token)

  return (
    <>
      <CoursesPage courses={courses} />
    </>
  )
}

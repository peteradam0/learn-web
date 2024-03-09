import { getCourseDomain } from "@/course/api/get-course-domain"
import { queryToken } from "@/course/api/query/get-user-token"
import { CourseDetailsPage } from "@/course/ui/course-details-page"


export default async function CourseDetailsPageRoute({ params }: any) {
  const { courseId } = params
  const token = await queryToken()
  if (!token) return
  const course = await getCourseDomain(token, atob(courseId))

  if (!course) return
  return (
    <div>
      <CourseDetailsPage course={course} />
    </div>
  )
}

import { getCourse } from "@/course/api/get-courses"
import { queryToken } from "@/common/api/query/get-user-token"
import { CourseDetailsPage } from "@/course/ui/course-details-page"

export default async function CourseDetailsPageRoute({ params }: any) {
  const { courseId } = params
  const token = await queryToken()
  if (!token) return
  const course = await getCourse(token, atob(courseId))

  if (!course) return
  return (
    <div>
      <CourseDetailsPage course={course} />
    </div>
  )
}

import { getCourse } from "@/course/api/get-courses"
import { CourseDetailsPage } from "@/course/ui/course-details-page"

export default async function CourseDetailsPageRoute({ params }: any) {
  const { courseId } = params

  const course = await getCourse(atob(courseId))

  if (!course) return
  return (
    <div>
      <CourseDetailsPage course={course} />
    </div>
  )
}

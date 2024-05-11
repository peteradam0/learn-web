import { getNotInProgressCourses } from "@/course/api/get-courses"
import { CoursesPage } from "@/course/ui/courses-page"

export default async function CoursePageRoute() {
  const courses = await getNotInProgressCourses()

  return <CoursesPage courses={courses} />
}

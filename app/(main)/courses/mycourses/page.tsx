import { getInProgressCourses } from "@/course/api/get-courses"

import { MyCoursesPage } from "@/course/ui/my-courses-page"

export default async function MyCoursesPageRoute() {
  const inProgressCourseData = await getInProgressCourses()

  return <MyCoursesPage courses={inProgressCourseData} />
}

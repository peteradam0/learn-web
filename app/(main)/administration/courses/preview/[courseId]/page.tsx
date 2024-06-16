import { getCourse } from "@/course/api/get-courses"
import { CourseDetailsPage } from "@/course/ui/course-details-page"
import React from "react"

export default async function PreviewPageRoute({
  params
}: {
  params: { courseId: string }
}) {
  const course = await getCourse(atob(params.courseId))

  if (!course) return

  return <CourseDetailsPage course={course} />
}

import CourseDetailsPage from "@/course/ui/course-details-page"
import React from "react"

export default function CourseDetailsPageRoute({ params }: any) {
  const { courseId } = params
  return (
    <div>
      <CourseDetailsPage courseId={atob(courseId)} />
    </div>
  )
}

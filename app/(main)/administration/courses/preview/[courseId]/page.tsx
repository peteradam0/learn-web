import CoursePreviewPage from "@/course/ui/course-preview-page"
import React from "react"

export default function PreviewPageRoute({
  params
}: {
  params: { courseId: string }
}) {
  return (
    <div>
      <CoursePreviewPage courseId={params.courseId} />
    </div>
  )
}

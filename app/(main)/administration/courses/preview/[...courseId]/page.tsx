import CoursePreviewPage from "@/course/ui-adapter/course-preview-page";
import React from "react";

export default function PreviewPageRoute({
  params,
}: {
  params: { courseId: string };
}) {
  return (
    <div>
      <CoursePreviewPage courseId={params.courseId} />
    </div>
  );
}

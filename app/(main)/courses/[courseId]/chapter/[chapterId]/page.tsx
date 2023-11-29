import CourseVideoPage from "@/course/ui-adapter/course-video-page";
import React from "react";

export default function ChapterPageRoute({ params }: any) {
  const { courseId, chapterId } = params;

  return (
    <div>
      <CourseVideoPage />
    </div>
  );
}

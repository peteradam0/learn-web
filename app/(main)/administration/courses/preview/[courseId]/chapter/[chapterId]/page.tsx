import React from "react";

export default function ChapterPageRoute({ params }: any) {
  const { courseId, chapterId } = params;

  return (
    <div>
      {chapterId}ChapterPageRoute {courseId}
    </div>
  );
}

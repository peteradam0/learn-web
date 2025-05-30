import React from "react"
import CourseSection from "./course-section"

export default function CourseTableOfContents(data: any) {
  const chapterData = data.chapterData
  const courseId = data.courseId

  return (
    <div>
      {chapterData.length > 0 && <h2 className="font-semibold text-white pb-1 text-xl">
        Table of Contents
      </h2>}
      {chapterData?.map((chapter: any) => (
        <CourseSection key={chapter.id} data={chapter} courseId={courseId} />
      ))}
    </div>
  )
}

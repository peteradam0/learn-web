import React from "react"
import CourseTableOfContents from "./course-table-of-contents"

import "next-cloudinary/dist/cld-video-player.css"

export default function CourseContent(data: any) {
  const course = data.courseData
  const courseDate = new Date(course.createdAt).toDateString()

  return (
    <div
      style={{
        paddingTop: "2rem"
      }}
    >
      <div
        style={{ paddingTop: "2%", paddingBottom: "2%", background: "black" }}
      >
        <div
          className="text-sm text-white flex items-center"
          style={{ marginLeft: "10%" }}
        >
          <video width="600" height="450" src={course.videoUrl} controls />

          <div
            className="text-white text-xl mb-2  p-1"
            style={{ marginLeft: "1rem" }}
          >
            <p>{course.description}</p>
            <div className="pt-1 pb-2">
              <div
                style={{
                  paddingTop: "1%"
                }}
                className="pt-1"
              >
                <span className="text-sm">Published:</span>
                <span className="inline-block bg-gray-200 rounded-full px-1 py-1 text-sm font-semibold text-gray-700 mr-1 mb-1">
                  {courseDate.toString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {course.chapterData.length > 0 && 
      <div
        style={{
          paddingTop: "3rem",
          paddingLeft: "10%",
          paddingRight: "10%"
        }}
      >
        <CourseTableOfContents
          chapterData={course.chapterData}
          courseId={course.id}
        />
      </div>}
    </div>
  )
}

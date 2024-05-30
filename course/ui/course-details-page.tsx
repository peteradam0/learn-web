import { Course } from "@/course/domain/course"
import React from "react"
import CourseContent from "./course-content"
import CourseHeadline from "./course-headline"

export type CourseDetailsPageProps = {
  course: Course | undefined
}

export const CourseDetailsPage: React.FC<CourseDetailsPageProps> = ({
  course
}) => {
  return (
    <div className="mb-8" style={{ paddingTop: "50px", background: "#1e2025" }}>
      <CourseHeadline courseData={course} />
      <CourseContent courseData={course} />
    </div>
  )
}

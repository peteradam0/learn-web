import { Course } from "@/common/domain/course"
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
    <>
      <div className=" p-6 backgroundPrimary flex items-center justify-center">
        <div className="container mx-auto">
          <CourseHeadline courseData={course} />
        </div>
      </div>
      <CourseContent courseData={course} />
    </>
  )
}

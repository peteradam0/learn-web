import { getCourse } from "@/course/api/get-courses"
import CourseContent from "./course-content"
import CourseHeadline from "./course-headline"

export default async function CoursePreviewPage(params: { courseId: string }) {
  const decodedId = atob(params.courseId)
  const course = await getCourse(decodedId)

  return (
    <>
      <div className=" p-6 primaryColor flex items-center justify-center">
        <div className="container mx-auto">
          <CourseHeadline courseData={course} />
        </div>
      </div>
      <CourseContent courseData={course} />
    </>
  )
}

"use client"

import { useEffect, useState } from "react"
import { queryCourseData } from "../api/query/query-course"
import CourseContent from "./course-content"
import CourseHeadline from "./course-headline"

export default function CoursePreviewPage(params: { courseId: string }) {
  const decodedId = atob(params.courseId)
  const [courseData, setCourseData] = useState({})
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    getCourseData()
  }, [])

  const getCourseData = async () => {
    setLoading(true)

    try {
      const course = await queryCourseData(decodedId)
      setCourseData(course?.data)
      setLoading(false)
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  if (isLoading) return <p>Loading...</p>

  return (
    <>
      <div className=" p-6 primaryColor flex items-center justify-center">
        <div className="container mx-auto">
          <CourseHeadline courseData={courseData} />
        </div>
      </div>
      <CourseContent courseData={courseData} />
    </>
  )
}

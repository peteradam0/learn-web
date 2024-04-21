"use client"

import React, { useEffect, useState } from "react"
import CourseHeadline from "./course-headline"
import CourseContent from "./course-content"
import { queryToken } from "../../common/api/query/get-user-token"
import { redirect } from "next/navigation"
import { queryCourseData } from "../api/query/query-course-data"

export default function CoursePreviewPage(params: { courseId: string }) {
  const decodedId = atob(params.courseId)
  const [courseData, setCourseData] = useState({})
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    getCourseData()
  }, [])

  const getCourseData = async () => {
    setLoading(true)
    const token = await queryToken()

    if (!token) {
      redirect("/")
    }

    try {
      const course = await queryCourseData(token, decodedId)
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

"use client"

import React, { useEffect, useState } from "react"

import { redirect } from "next/navigation"
import { querySelfCourses } from "@/course/api/query/query-self-courses"
import { SearchBar } from "@/course/ui/searchbar"
import CourseCard from "@/course/ui/course-card"
import { queryToken } from "@/course/api/query/get-user-token"

export default function CoursePageRoute() {
  const [courseData, setCourseData] = useState<any>([])
  const [isLoading, setLoading] = useState(true)
  const [search, setSerach] = useState("")

  useEffect(() => {
    getCourseData()
  }, [])

  useEffect(() => {
    console.log(search)
  }, [search])

  const getCourseData = async () => {
    const token = await queryToken()

    if (!token) {
      redirect("/")
    }

    try {
      const res = await querySelfCourses(token)
      setCourseData(res?.data)
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  if (isLoading) return <p>Loading...</p>

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div style={{ marginBottom: "3%" }}>
          <h2 className="font-semibold text-xl text-white  pb-1">
            Frontend & Fullstack Engineering Courses
          </h2>
          <p className="text-gray-500 mb-6">
            ed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium.
          </p>
        </div>
        <SearchBar setSearch={setSerach} />
        <div className="grid grid-cols-4  pb-2" style={{ gap: "1.6rem" }}>
          {courseData
            .filter((course: any) => {
              return search.toLocaleLowerCase() === ""
                ? course
                : course.title.toLocaleLowerCase().includes(search)
            })
            .map((course: any) => (
              <CourseCard key={course.id} course={course} />
            ))}
        </div>
      </div>
    </div>
  )
}

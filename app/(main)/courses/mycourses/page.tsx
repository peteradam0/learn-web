"use client"

import { useEffect, useState } from "react"

import { getInProgressCourses } from "@/course/api/get-course"
import { getUserToken } from "@/course/domain/get-user-token"
import CourseProgressCard from "@/course/ui/course-progress.card"
import { SearchBar } from "@/course/ui/searchbar"
import { redirect } from "next/navigation"

export default function MyCoursesPageRoute() {
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
    const token = await getUserToken()

    if (!token) {
      redirect("/")
    }

    try {
      const res = await getInProgressCourses(token)
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
        <div style={{ marginBottom: "3%", marginTop: "3%" }}>
          <h2 className="font-semibold text-xl text-white  pb-1">My Courses</h2>
          <p className="text-gray-500 mb-6">
            ed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium.
          </p>
        </div>
        <SearchBar setSearch={setSerach} />
        <div className="grid grid-cols-4 pb-2" style={{ gap: "1.6rem" }}>
          {courseData
            .filter((course: any) => {
              return search.toLocaleLowerCase() === ""
                ? course
                : course.title.toLocaleLowerCase().includes(search)
            })
            .map((course: any) => (
              <CourseProgressCard key={course.id} course={course} />
            ))}
        </div>
      </div>
    </div>
  )
}

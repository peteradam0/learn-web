"use client"

import { Course } from "@/course/domain/course"
import CourseProgressCard from "@/course/ui/course-progress.card"
import { SearchBar } from "@/course/ui/searchbar"
import { useState } from "react"

export type MyCoursesPageProps = {
  courses: Course[] | undefined
}

export const MyCoursesPage: React.FC<MyCoursesPageProps> = ({ courses }) => {
  const [search, setSerach] = useState("")

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
          {courses &&
            courses
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

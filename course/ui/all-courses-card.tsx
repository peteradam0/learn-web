import { Course } from "@/course/domain/course"
import { Card, CardFooter, Link } from "@nextui-org/react"
import React from "react"
import CourseCard from "./course-card"

export type CoursesInProgressCardProps = {
  courses: Course[] | undefined
}

export const AllCoursesCard: React.FC<CoursesInProgressCardProps> = ({
  courses
}) => {
  return (
    <Card className="max-w-[400px]">
      {courses &&
        courses
          .slice(0, 2)
          .map((courseData: any) => (
            <CourseCard key={courseData.id} course={courseData} />
          ))}
      <CardFooter>
        <Link className="text-small" isExternal showAnchorIcon href="/courses">
          See all the available courses.
        </Link>
      </CardFooter>
    </Card>
  )
}

import { Course } from "@/course/domain/course"
import { Card, CardFooter, CardHeader, Link } from "@nextui-org/react"
import CourseInProgressCardBody from "./course-in-progres-card-body"

export type CoursesInProgressCardProps = {
  inProgressCourses: Course[] | undefined
}

export const CoursesInProgressCard: React.FC<CoursesInProgressCardProps> = ({
  inProgressCourses
}) => {
  if (!inProgressCourses) return
  return (
    <Card className="max-w-[400px]">
      {inProgressCourses.length === 0 && (
        <CardHeader>
          <p>
            Have not started watching courses, no worries!
            <br />
            <span className="text-small text-default-500 pt-1">
              Below are some great courses to check out:
            </span>
          </p>
        </CardHeader>
      )}

      {inProgressCourses.length !== 0
        ? inProgressCourses
            ?.slice(0, 2)
            .map((course: any) => (
              <CourseInProgressCardBody
                key={course.id}
                course={course}
                displayProgressBar={true}
              />
            ))
        : inProgressCourses
            ?.slice(0, 2)
            .map((course: any) => (
              <CourseInProgressCardBody key={course.id} course={course} />
            ))}
      <CardFooter>
        <Link className="text-small" isExternal showAnchorIcon href="/courses">
          See all courses.
        </Link>
      </CardFooter>
    </Card>
  )
}

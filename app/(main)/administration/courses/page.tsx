import { Button, Link } from "@nextui-org/react"

import MyCourseCreateCard from "@/course/ui/my-course-create-card"
import { getAdminCourses } from "@/course/api/get-courses"

export default async function MyCoursePage() {
  const courses = await getAdminCourses()

  return (
    <div className="min-h-screen p-6 primaryColor flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div className="py-8">
          <h2 className="font-semibold text-xl text-white pb-1">Courses</h2>
          <p className="text-gray-500 mb-6">
            ed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium.
          </p>

          <div style={{ paddingBottom: "20px" }}>
            <Link href="/administration/courses/create">
              <Button color="success">Add course</Button>
            </Link>
          </div>
        </div>
        <div className="container mx-auto py-46 pt-2">
          <div className="grid lg:grid-cols-4 gap-4">
            {courses.map((course: any) => (
              <>
                <MyCourseCreateCard key={course.id} course={course} />
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

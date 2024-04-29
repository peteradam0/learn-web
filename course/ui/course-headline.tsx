import { Avatar, Chip } from "@nextui-org/react"

export default function CourseHeadline(data: any) {
  const course = data.courseData
  return (
    <div>
      <h2 className="font-semibold text-xl text-white pb-1">{course.title}</h2>
      <div className="text-sm text-white flex items-center">
        <img
          src={course.imageUrl}
          alt="waves"
          style={{
            height: "170px",
            paddingTop: "15px",
            width: "300px"
          }}
        />
        <div
          className="text-gray-900 font-bold text-xl mb-2 p-1"
          style={{ marginLeft: "1rem" }}
        >
          <div className="pt-1 pb-2">
            <div
              style={{
                paddingTop: "10px"
              }}
              className="pt-1"
            >
              <div className="text-sm">{course.description}</div>
            </div>
          </div>
          <div className="flex items-center gap-4 pt-2">
            <Avatar src={course?.courseAuthorData?.imageUrl} size="md" />
            <div className="font-medium text-gray-500">
              <div>
                {course?.courseAuthorData?.firstName +
                  " " +
                  course?.courseAuthorData?.lastName}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {course.organization && (
                  <Chip size="sm" color="success">
                    {course.organization.name}
                  </Chip>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

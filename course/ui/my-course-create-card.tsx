"use client"

import { Button, Card, Chip } from "@nextui-org/react"
import { useRouter } from "next/navigation"

export default function MyCourseCreateCard({ course }: any) {
  const router = useRouter()

  const handleRedirect = (courseId: string) => {
    router.push(`/administration/courses/create/${btoa(courseId)}`)
  }
  const handleRedirectToPreview = (courseId: string) => {
    router.push(`/administration/courses/preview/${btoa(courseId)}`)
  }

  return (
    <Card style={{ background: "#12181f", border: "solid #494949 0.0006em" }}>
      <div className="relative flex flex-col min-w-0 break-wordsshadow-soft-xl rounded-2xl bg-clip-border ">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap -mx-3">
            <div className="max-w-full px-3 lg:w-1/2 lg:flex-none ">
              <div className="flex flex-col h-full ">
                <p className="pt-2 font-semibold text-white">{course.title}</p>
                <div className="max-w-full ml-auto text-center lg:w-5/12 lg:flex-none">
                  <img
                    src={course.imageUrl}
                    alt="waves"
                    style={{
                      height: "120px",
                      paddingTop: "15px",
                      width: "200px"
                    }}
                  />
                </div>

                <div style={{ paddingTop: "15px" }}>
                  <div className="flex items-center gap-4">
                    <div style={{ paddingTop: "10px" }}>
                      {course.published && (
                        <Chip size="sm" color="success" variant="bordered">
                          Published
                        </Chip>
                      )}
                      {!course.published && (
                        <Chip size="sm" color="warning" variant="bordered">
                          Unpublished
                        </Chip>
                      )}
                    </div>
                  </div>
                  <p
                    style={{ paddingTop: "15px", paddingBottom: "15px" }}
                    className="mb-12 text-gray-600 text-sm"
                  >
                    {course.description}
                  </p>
                  <a className="" href="javascript:;"></a>
                  <div className="flex gap-4 items-center pt-1">
                    <Button
                      size="sm"
                      color="secondary"
                      onClick={() => handleRedirect(course.id)}
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      color="success"
                      onClick={() => handleRedirectToPreview(course.id)}
                    >
                      Preview
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

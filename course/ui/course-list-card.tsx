"use client"

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader
} from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import {
  queryCoursePartitipation,
  queryCreateCoursePartitipation
} from "../api/query/query-course-participation"

export default function CourseListCard({ course }: any) {
  const [isLoading, setIsLoading] = useState(false)
  const [participationData, setParticipationData] = useState()
  const router = useRouter()

  useEffect(() => {
    getParticipationData()
  }, [])

  const handleRedirect = () => {
    router.push(`/courses/${btoa(course?.id)}`)
  }

  const handleEnroll = async () => {
    await queryCreateCoursePartitipation(course?.id)
    handleRedirect()
  }

  const getParticipationData = async () => {
    try {
      const res = await queryCoursePartitipation(course?.id)
      setParticipationData(res?.data.courseId)

      setIsLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  if (isLoading) return <p>Loading...</p>

  return (
    <Card style={{ background: "#12181f", border: "solid #494949 0.0006em" }}>
      <div
        className="relative flex flex-col min-w-0 break-wordsshadow-soft-xl rounded-2xl bg-clip-border"
        style={{ height: "100%" }}
      >
        <div className="flex-auto p-4">
          <div className="flex flex-wrap -mx-3">
            <CardHeader>
              <p className=" font-semibold text-white">{course.title}</p>
            </CardHeader>
            <CardBody>
              <div className="max-w-full text-center lg:flex-none">
                <img
                  src={course.imageUrl}
                  alt="waves"
                  style={{
                    height: "100%",
                    width: "100%"
                  }}
                />
              </div>
              <p
                className="mb-12 text-gray-400 text-sm"
                style={{ paddingTop: "5%" }}
              >
                {course.description}
              </p>
            </CardBody>
            <CardFooter>
              {participationData && (
                <Button
                  color="secondary"
                  variant="bordered"
                  onClick={() => handleRedirect()}
                >
                  Continue
                </Button>
              )}
              {!participationData && (
                <Button color="primary" onClick={() => handleEnroll()}>
                  Enroll
                </Button>
              )}
            </CardFooter>
          </div>
        </div>
      </div>
    </Card>
  )
}

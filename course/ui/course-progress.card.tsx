"use client"

import { calculateProgressBar } from "@/course/domain/calculate-progress-bar"
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Progress
} from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
  queryCoursePartitipation,
  queryCreateCoursePartitipation
} from "../api/query/query-course-participation"

export default function CourseProgressCard({ course }: any) {
  const [isLoading, setIsLoading] = useState(false)
  const [participationData, setParticipationData] = useState()
  const [progressBarNumber, setProgressBarNumber] = useState(0)
  const router = useRouter()

  useEffect(() => {
    getParticipationData()
  }, [])

  const handleRedirect = () => {
    router.push(`/courses/${btoa(course.id)}`)
  }

  const handleEnroll = async () => {
    await queryCreateCoursePartitipation(course.id)
    handleRedirect()
  }

  const getParticipationData = async () => {
    try {
      const res = await queryCoursePartitipation(course.id)

      setParticipationData(res?.courseId)
      setProgressBarNumber(
        calculateProgressBar(
          course.chapterData.length,
          res?.completedChapterIds?.length
        )
      )
      setIsLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  if (isLoading) return <p>Loading...</p>

  return (
    <Card>
      <div
        className="bgbordercolor relative flex flex-col min-w-0 break-wordsshadow-soft-xl rounded-2xl bg-clip-border"
        style={{
          height: "100%",
          background: "#12181f",
          border: "solid #494949 0.0006em"
        }}
      >
        <div className="flex-auto p-4">
          <div className="flex flex-wrap -mx-3">
            <CardHeader>
              <p className=" font-semibold text-white">{course.title}</p>
            </CardHeader>
            <CardBody>
              <div className="max-w-full ml-auto text-center lg:w-5/12 lg:flex-none">
                <img
                  src={course.imageUrl}
                  alt="waves"
                  style={{
                    height: "100px",
                    width: "170px"
                  }}
                />
              </div>
              <p
                className="mb-12 text-gray-600 text-sm"
                style={{ paddingTop: "1rem" }}
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

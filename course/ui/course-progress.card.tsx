"use client"

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Progress
} from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import { queryToken } from "../../common/api/query/get-user-token"
import { useRouter } from "next/navigation"
import {
  queryCoursePartitipation,
  queryCreateCoursePartitipation
} from "../api/query/query-course-participation"
import { calculateProgressBar } from "@/course/domain/calculate-progress-bar"

export default function CourseProgressCard({ course }: any) {
  const [isLoading, setIsLoading] = useState(false)
  const [participationData, setParticipationData] = useState()
  const [progressBarNumber, setProgressBarNumber] = useState(0)

  const router = useRouter()

  useEffect(() => {
    getParticipationData()
  }, [])

  const handleRedirect = () => {
    router.push(`/courses/${btoa(course?.id)}`)
  }

  const handleEnroll = async () => {
    const token = await queryToken()

    if (token === null) {
      router.push("/")
    } else {
      const res = await queryCreateCoursePartitipation(course?.id, token)

      if (res) {
        handleRedirect()
      }
    }
  }

  const getParticipationData = async () => {
    const token = await queryToken()
    if (!token) {
      router.push("/")
    } else {
      try {
        const res = await queryCoursePartitipation(course?.id, token)
        setParticipationData(res?.data.courseId)
        setProgressBarNumber(
          calculateProgressBar(
            course.chapterData.length,
            res?.data?.completedChapterIds?.length
          )
        )
        setIsLoading(false)
      } catch (e) {
        console.log(e)
      }
    }
  }

  if (isLoading) return <p>Loading...</p>

  return (
    <Card>
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
              <p className="mb-12 text-gray-600" style={{ paddingTop: "5%" }}>
                {course.description}
              </p>
              <div style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
                <Progress
                  size="sm"
                  aria-label="Loading..."
                  value={progressBarNumber}
                />
              </div>
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

"use client";
import { getCoursePartitipation } from "@/course/api-adapter/get-course-participation";
import { getUserToken } from "@/course/domain/get-user-token";
import { CardBody, Chip, Divider, Link, Progress } from "@nextui-org/react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { calculateProgressBar } from "../domain/calculate-progress-bar";

export default function CourseInProgressCardBody({
  course,
  displayProgressBar,
}: any) {
  const [progressBarNumber, setProgressBarNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const url = `/courses/${course?.id}`;

  useEffect(() => {
    setLoading(true);
    getCourseData();
  }, []);

  const getCourseData = async () => {
    const token = await getUserToken();

    if (!token) {
      redirect("/");
    }

    try {
      const res = await getCoursePartitipation(course.id, token);

      setProgressBarNumber(
        calculateProgressBar(
          course.chapterData.length,
          res?.data?.completedChapterIds?.length
        )
      );
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <CardBody>
        <Link href={url}>
          <div className="text-sm text-gray-600 flex items-center">
            <div className="text-gray-900 font-bold mb-1 ml-1 p-1">
              <div className="flex items-center gap-4 pt-1">
                <img
                  src={course.imageUrl}
                  style={{ height: "50px", width: "100px" }}
                />
                <div className="font-medium text-gray-500">
                  <div className="text-sm">{course.title}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {course.courseAuthorData.firstName}{" "}
                    {course.courseAuthorData.lastName}
                  </div>
                  <div className="pt-1">
                    <Chip size="sm" color="success">
                      {course.organization.name}
                    </Chip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
        {displayProgressBar && (
          <div
            style={{
              paddingTop: "10px",
              paddingRight: "10px",
              paddingLeft: "6px",
              paddingBottom: "10px",
            }}
          >
            <Progress
              size="sm"
              aria-label="Loading..."
              value={progressBarNumber}
            />
          </div>
        )}
      </CardBody>
      <Divider />
    </>
  );
}

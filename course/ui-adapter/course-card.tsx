"use client";

import { Avatar, Button, Card } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { createCoursePartitipation } from "../api-adapter/create-course-participation";
import { getUserToken } from "../domain/get-user-token";
import { useRouter } from "next/navigation";
import { getCoursePartitipation } from "../api-adapter/get-course-participation";

export default function CourseCard({ course }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [participationData, setParticipationData] = useState();
  const router = useRouter();

  useEffect(() => {
    getParticipationData();
  }, []);

  const handleEnroll = async () => {
    const token = await getUserToken();

    if (token === null) {
      router.push("/");
    } else {
      const res = await createCoursePartitipation(course?.id, token);
      if (res) {
        router.push(`/courses/${course?.id}`);
      }
    }
  };

  const getParticipationData = async () => {
    const token = await getUserToken();
    if (!token) {
      router.push("/");
    } else {
      try {
        const res = await getCoursePartitipation(course?.id, token);
        setParticipationData(res?.data.courseId);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <Card>
      <div className="relative flex flex-col min-w-0 break-wordsshadow-soft-xl rounded-2xl bg-clip-border ">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap -mx-3">
            <div className="max-w-full px-3 lg:w-1/2 lg:flex-none ">
              <div className="flex flex-col h-full bg-black">
                <p className="pt-2 font-semibold text-gray-600">
                  {course.title}
                </p>
                <div className="max-w-full ml-auto text-center lg:w-5/12 lg:flex-none">
                  <img
                    src={course.imageUrl}
                    alt="waves"
                    style={{
                      height: "170px",
                      paddingTop: "15px",
                      width: "350px",
                    }}
                  />
                </div>

                <div style={{ paddingTop: "15px" }}>
                  <div className="flex items-center gap-4">
                    <Avatar
                      src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                      size="md"
                    />
                    <div className="font-medium text-gray-500">
                      <div>John Doe</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Snowflake
                      </div>
                    </div>
                  </div>
                  <p
                    style={{ paddingTop: "15px", paddingBottom: "15px" }}
                    className="mb-12 text-gray-600"
                  >
                    {course.description}
                  </p>
                  <a className="" href="javascript:;"></a>
                  <div className="flex gap-4 items-center pt-1">
                    {participationData && (
                      <Button color="secondary" variant="bordered">
                        Continue
                      </Button>
                    )}
                    {!participationData && (
                      <Button color="primary" onClick={() => handleEnroll()}>
                        Enroll
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

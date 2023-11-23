"use client";

import { Button, Card, Chip } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function MyCourseCard({ course }: any) {
  const router = useRouter();
  const handleRedirect = (courseId: string) => {
    router.push(`/administration/courses/create/${courseId}`);
  };
  return (
    <div className="shadow-lg">
      <Card className="bg-red-300">
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
                      <div style={{ paddingTop: "10px" }}>
                        {course.published && (
                          <Chip color="success">Published</Chip>
                        )}
                        {!course.published && (
                          <Chip color="warning">Unpublished</Chip>
                        )}
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
                      <Button
                        color="secondary"
                        variant="bordered"
                        onClick={() => handleRedirect(course.id)}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

import { CardBody, Chip, Divider } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

export default function CourseCard({ course }: any) {
  const url = `/courses/${btoa(course?.id)}`;
  return (
    <>
      <CardBody>
        <Link href={url}>
          <div className="text-sm text-gray-600 flex items-center">
            <div className="text-gray-900 font-bold mb-1 ml-1 p-1">
              <div className="flex items-center gap-4 pt-1">
                <img
                  src={course?.imageUrl}
                  style={{ height: "50px", width: "100px" }}
                />
                <div className="font-medium text-gray-500">
                  <div className="text-sm">{course?.title}</div>
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
      </CardBody>
      <Divider />
    </>
  );
}

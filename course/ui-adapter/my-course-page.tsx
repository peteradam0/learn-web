"use client";

import { Button, Link } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import CourseCard from "./my-course-card";
import { getCoursesForUser } from "../api-adapter/get-courses-user";
import { getUserToken } from "../domain/get-user-token";
import { redirect } from "next/navigation";

export default function MyCoursePage() {
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getCourseData();
  }, []);

  const getCourseData = async () => {
    const token = await getUserToken();

    if (!token) {
      redirect("/");
    }

    try {
      const res = await getCoursesForUser(token);
      setCourseData(res?.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <h2 className="font-semibold text-xl text-gray-600 pb-1">MyCourses</h2>
        <p className="text-gray-500 mb-6">
          ed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium.
        </p>

        <div style={{ paddingBottom: "20px" }}>
          <Link href="/administration/courses/create">
            <Button>Add course</Button>
          </Link>
        </div>
        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div className="container mx-auto py-46 px-8">
            <div className="grid lg:grid-cols-3 gap-4">
              {courseData.map((course) => (
                <>
                  <CourseCard course={course} />
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import CourseCard from "./course-card";
import { getUserToken } from "../domain/get-user-token";
import { redirect } from "next/navigation";
import { getSelfhedCourses } from "@/dashboard/api-adapter/get-published-courses";

export default function CoursePage() {
  const [courseData, setCourseData] = useState<any>([]);
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
      const res = await getSelfhedCourses(token);
      setCourseData(res?.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <h2 className="font-semibold text-xl text-white  pb-1">
          Frontend & Fullstack Engineering Courses
        </h2>
        <p className="text-gray-500 mb-6">
          ed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium.
        </p>

        <div className="grid grid-cols-4 gap-4 pb-2">
          {courseData.map((course: any) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}

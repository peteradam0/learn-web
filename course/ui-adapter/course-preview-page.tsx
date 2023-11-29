"use client";

import React, { useEffect, useState } from "react";
import CourseHeadline from "./course-headline";
import CourseContent from "./course-content";
import { getUserToken } from "../domain/get-user-token";
import { redirect } from "next/navigation";
import { getCourse } from "../api-adapter/get-course";

export default function CoursePreviewPage(params: { courseId: string }) {
  const [courseData, setCourseData] = useState({});
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getCourseData();
  }, []);

  const getCourseData = async () => {
    setLoading(true);
    const token = await getUserToken();

    if (!token) {
      redirect("/");
    }

    try {
      const course = await getCourse(token, params.courseId);
      setCourseData(course?.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div className=" p-6 bg-gray-100 flex items-center justify-center">
        <div className="container mx-auto">
          <CourseHeadline courseData={courseData} />
        </div>
      </div>
      <CourseContent courseData={courseData} />
    </>
  );
}

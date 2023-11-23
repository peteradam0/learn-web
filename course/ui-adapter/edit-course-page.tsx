"use client";

import React, { useEffect, useState } from "react";
import { getUserToken } from "../domain/get-user-token";
import { redirect } from "next/navigation";
import { getCourse } from "../api-adapter/get-course";

export default function EditCoursePage({
  params,
}: {
  params: { courseId: string };
}) {
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
      const res = await getCourse(token, params.courseId);
      setCourseData(res?.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
    console.log(courseData);
  };

  if (isLoading) return <p>Loading...</p>;
  return <div>EditCoursePage {courseData}</div>;
}

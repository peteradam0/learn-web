"use client";

import { Button, Link } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import CourseCard from "./course-card";
import { getCoursesForUser } from "../api-adapter/get-courses-user";
import { getUserToken } from "../domain/get-user-token";
import { redirect } from "next/navigation";

export default function CoursePage() {
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

  console.log(courseData);
  return (
    <div className="p-6">
      <Link href="/administration/courses/create">
        <Button>Add course</Button>
      </Link>

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
  );
}

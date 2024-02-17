"use client";

import { Button, Link } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

import { redirect } from "next/navigation";
import { getUserToken } from "@/course/domain/get-user-token";
import { getCoursesForUser } from "@/course/api-adapter/get-courses-user";
import CourseCard from "@/course/ui-adapter/course-card";

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
    <div className="min-h-screen p-6 bg-black flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <h2 className="font-semibold text-xl text-white pb-1">MyCourses</h2>
        <p className="text-white mb-6">
          ed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium.
        </p>

        <div style={{ paddingBottom: "20px" }}>
          <Link href="/administration/courses/create">
            <Button color="success">Add course</Button>
          </Link>
        </div>

        <div className="container mx-auto py-46 pt-2">
          <div className="grid lg:grid-cols-4 gap-4">
            {courseData.map((course: any) => (
              <>
                <CourseCard key={course.id} course={course} />
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

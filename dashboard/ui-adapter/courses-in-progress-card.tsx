import { Card, CardFooter, CardHeader, Link } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import CourseInProgressCardBody from "./course-in-progres-card-body";
import { getUserToken } from "@/course/domain/get-user-token";
import { redirect } from "next/navigation";
import { getInProgressCourses } from "@/course/api-adapter/get-course";

export default function CoursesInProgressCard() {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(false);

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
      const res = await getInProgressCourses(token);
      setCourseData(res?.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) return <p>Loading...</p>;
  return (
    <Card className="max-w-[400px]">
      <CardHeader>
        <p>
          Haven't started watching courses, no worries!
          <br />
          <span className="text-small text-default-500 pt-1">
            Below are some great courses to check out:
          </span>
        </p>
      </CardHeader>
      {courseData?.map((course) => (
        <CourseInProgressCardBody key={course.id} course={course} />
      ))}
      <CardFooter>
        <Link className="text-small" isExternal showAnchorIcon href="/courses">
          See all in progress courses.
        </Link>
      </CardFooter>
    </Card>
  );
}

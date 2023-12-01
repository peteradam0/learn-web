import { Card, CardFooter, Link } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import CourseCard from "./course-card";
import { getUserToken } from "@/course/domain/get-user-token";
import { redirect } from "next/navigation";
import { getPublishedCourses } from "../api-adapter/get-published-courses";

export default function NewCoursesCard() {
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
      const res = await getPublishedCourses(token);
      setCourseData(res?.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Card className="max-w-[400px]">
      {courseData.map((course: any) => (
        <CourseCard key={course.id} course={course} />
      ))}
      <CardFooter>
        <Link className="text-small" isExternal showAnchorIcon href="/courses">
          See all the available courses.
        </Link>
      </CardFooter>
    </Card>
  );
}

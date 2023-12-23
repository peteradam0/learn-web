import { Card, CardFooter, CardHeader, Link } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import CourseInProgressCardBody from "./course-in-progres-card-body";
import { getUserToken } from "@/course/domain/get-user-token";
import { redirect } from "next/navigation";
import { getInProgressCourses } from "@/course/api-adapter/get-course";
import { getPublishedCourses } from "../api-adapter/get-published-courses";

export default function CoursesInProgressCard() {
  const [inProgressCourses, setInProgressCourseData] = useState([]);
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
      const resCourse = await getPublishedCourses(token);
      setCourseData(resCourse?.data);
      setInProgressCourseData(res?.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) return <p>Loading...</p>;
  return (
    <Card className="max-w-[400px]">
      {inProgressCourses.length === 0 && (
        <CardHeader>
          <p>
            Haven't started watching courses, no worries!
            <br />
            <span className="text-small text-default-500 pt-1">
              Below are some great courses to check out:
            </span>
          </p>
        </CardHeader>
      )}

      {inProgressCourses.length !== 0
        ? inProgressCourses
            ?.slice(0, 2)
            .map((course) => (
              <CourseInProgressCardBody
                key={course.id}
                course={course}
                displayProgressBar={true}
              />
            ))
        : courseData
            ?.slice(0, 2)
            .map((course) => (
              <CourseInProgressCardBody key={course.id} course={course} />
            ))}
      <CardFooter>
        <Link className="text-small" isExternal showAnchorIcon href="/courses">
          See all courses.
        </Link>
      </CardFooter>
    </Card>
  );
}

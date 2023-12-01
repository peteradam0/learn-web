import { Card, CardFooter, CardHeader, Link } from "@nextui-org/react";
import React from "react";
import CourseCard from "./course-card";

export default function NewCoursesCard() {
  return (
    <Card className="max-w-[400px]">
      <CourseCard />
      <CourseCard />
      <CourseCard />
      <CardFooter></CardFooter>
    </Card>
  );
}

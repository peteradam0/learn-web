import { Button, Link, Image } from "@nextui-org/react";
import React from "react";
import CourseCard from "./course-card";

export default function CoursePage() {
  return (
    <div className="p-6">
      <Link href="/administration/courses/create">
        <Button>Add course</Button>
      </Link>
      <div className="container mx-auto py-46 px-8">
        <div className="grid lg:grid-cols-3 gap-4">
          <CourseCard />
        </div>
      </div>
    </div>
  );
}

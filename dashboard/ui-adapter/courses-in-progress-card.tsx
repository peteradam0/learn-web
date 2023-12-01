import { Card, CardFooter, CardHeader, Link } from "@nextui-org/react";
import React from "react";
import CourseInProgressCardBody from "./course-in-progres-card-body";

export default function CoursesInProgressCard() {
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
      <CourseInProgressCardBody />
      <CardFooter>
        <Link className="text-small" isExternal showAnchorIcon href="/courses">
          See all in progress courses.
        </Link>
      </CardFooter>
    </Card>
  );
}

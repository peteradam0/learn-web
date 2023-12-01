import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
} from "@nextui-org/react";
import React from "react";
import CourseCard from "./course-card";

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
      <CourseCard />
      <CourseCard />
      <CourseCard />
      <CardFooter>
        <Link isExternal showAnchorIcon href="/courses">
          See all courses.
        </Link>
      </CardFooter>
    </Card>
  );
}

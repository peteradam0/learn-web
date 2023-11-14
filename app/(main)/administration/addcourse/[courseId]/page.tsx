import React from "react";

type CourseIdPageRouteProps = {
  params: { courseId: string };
};

export default function CourseIdPageRoute({ params }: CourseIdPageRouteProps) {
  return <div>CourseIdPageRoute {params.courseId}</div>;
}

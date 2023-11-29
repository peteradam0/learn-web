import React from "react";
import CourseSection from "./course-section";

export default function CourseTableOfContents() {
  return (
    <div>
      <h2 className="font-semibold text-white pb-1">Table of Contents</h2>
      <CourseSection />
      <CourseSection />
      <CourseSection />
      <CourseSection />
    </div>
  );
}

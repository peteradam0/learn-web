"use client";

import React from "react";
import CourseHeadline from "./course-headline";
import { Avatar, Chip } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import CourseContent from "./course-content";

export default function CoursePreviewPage() {
  return (
    <>
      <div className=" p-6 bg-gray-100 flex items-center justify-center">
        <div className="container mx-auto">
          <CourseHeadline />
        </div>
      </div>
      <CourseContent />
    </>
  );
}

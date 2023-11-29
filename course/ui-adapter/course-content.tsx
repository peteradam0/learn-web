"use client";

import React from "react";
import CourseTableOfContents from "./course-table-of-contents";
import { CldVideoPlayer } from "next-cloudinary";

import "next-cloudinary/dist/cld-video-player.css";

export default function CourseContent(data: any) {
  const course = data.courseData;
  const courseDate = new Date(course.createdAt).toDateString();
  return (
    <div
      style={{
        backgroundColor: "black",
        marginLeft: "105px",
        paddingTop: "50px",
      }}
    >
      <div className="text-sm text-gray-600 flex items-center ">
        <CldVideoPlayer width="700" height="450" src={course.videoUrl} />

        <div className="text-white  text-xl mb-2 ml-2 p-1">
          <p>{course.description}</p>
          <div className="pt-1 pb-2">
            <div
              style={{
                paddingTop: "10px",
              }}
              className="pt-1"
            >
              <span className="text-sm">Published:</span>
              <span className="inline-block bg-gray-200 rounded-full px-1 py-1 text-sm font-semibold text-gray-700 mr-1 mb-1">
                {courseDate.toString()}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          paddingTop: "25px",
        }}
      >
        <CourseTableOfContents
          chapterData={course.chapterData}
          courseId={course.id}
        />
      </div>
    </div>
  );
}

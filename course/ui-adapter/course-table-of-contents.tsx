import React from "react";
import CourseSection from "./course-section";

export default function CourseTableOfContents(data: any) {
  const chapterData = data.chapterData;
  console.log(chapterData);
  return (
    <div>
      <h2 className="font-semibold text-white pb-1">Table of Contents</h2>
      {chapterData?.map((chapter: any) => (
        <CourseSection key={chapter.id} data={chapter} />
      ))}
    </div>
  );
}

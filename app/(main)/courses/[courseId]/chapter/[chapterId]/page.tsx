"use client";
import { getCourse } from "@/course/api-adapter/get-course";
import { getUserToken } from "@/course/domain/get-user-token";
import CourseVideoPage from "@/course/ui-adapter/course-video-page";

import VidePlayerSidebar from "@/navigation/ui-adapter/video-player-sidebar";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ChapterPageRoute({ params }: any) {
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState<any>({});
  const { courseId, chapterId } = params;

  const decodedCourseId = atob(courseId)
  const decodedChapterId = atob(chapterId)
  const getCurrentVideoUrl = (courseData: any, chapterId: string) => {
    const currentChapter = courseData?.chapterData?.find((chapter: any) => {
      return chapter.id === chapterId;
    });
    return currentChapter?.videoUrl;
  };

  useEffect(() => {
    getCourseData();
  }, []);

  const getCourseData = async () => {
    setLoading(true);
    const token = await getUserToken();

    if (!token) {
      redirect("/");
    }

    try {
      const course = await getCourse(token, decodedCourseId);
      setCourseData(course?.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <VidePlayerSidebar
        currentChapterId={decodedChapterId}
        chapterData={courseData.chapterData}
        courseId={decodedCourseId}
      />
      <div style={{ marginLeft: "255px" }}>
        <CourseVideoPage
          chapterId={decodedChapterId}
          courseId={decodedCourseId}
          videoUrl={getCurrentVideoUrl(courseData, decodedChapterId)}
        />
      </div>
    </div>
  );
}

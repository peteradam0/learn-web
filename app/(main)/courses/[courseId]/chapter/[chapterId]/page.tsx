import CourseVideoPage from "@/course/ui-adapter/course-video-page";
import SidebarContent from "@/navigation/ui-adapter/sidebar-content";
import VidePlayerSidebar from "@/navigation/ui-adapter/video-player-sidebar";
import React from "react";

export default function ChapterPageRoute({ params }: any) {
  const { courseId, chapterId } = params;

  return (
    <div>
      <VidePlayerSidebar />
      <div style={{ marginLeft: "255px" }}>
        <CourseVideoPage />
      </div>
    </div>
  );
}

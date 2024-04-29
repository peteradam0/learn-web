"use client"
import "next-cloudinary/dist/cld-video-player.css"
import { triggerCompleteChapter } from "@/course/domain/course"

export default function CourseVideoPage({
  videoUrl,
  chapterId,
  courseId
}: any) {
  return (
    <div style={{ overflow: "hidden" }}>
      <video
        id={chapterId}
        style={{ width: "100%", height: "100%" }}
        src={videoUrl}
        controls
        onEnded={() => triggerCompleteChapter(courseId, chapterId)}
      />
    </div>
  )
}

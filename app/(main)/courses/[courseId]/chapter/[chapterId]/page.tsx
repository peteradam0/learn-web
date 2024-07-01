import CourseVideoPage from "@/course/ui/course-video-page"

import { getCourse } from "@/course/api/get-courses"
import { getCurrentVideoUrl } from "@/course/domain/course"
import VidePlayerSidebar from "@/course/ui/video-player-sidebar"

export default async function ChapterPageRoute({ params }: any) {
  const { courseId, chapterId } = params

  const course = await getCourse(atob(courseId))

  if (!course || !course?.chapterData) return
  const url = getCurrentVideoUrl(course?.chapterData, atob(chapterId))?.videoUrl

  return (
    <div>
      <VidePlayerSidebar
        currentChapterId={atob(chapterId)}
        chapterData={course?.chapterData}
        courseId={atob(courseId)}
      />
      <div style={{ marginLeft: "15%", width: "86%" }}>
        <CourseVideoPage
          chapterId={courseId}
          courseId={courseId}
          videoUrl={url}
        />
      </div>
    </div>
  )
}

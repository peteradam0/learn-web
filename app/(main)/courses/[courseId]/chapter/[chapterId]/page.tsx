import { queryToken } from "@/common/api/query/get-user-token"
import CourseVideoPage from "@/course/ui/course-video-page"

import { getCourse } from "@/course/api/get-course"
import { getCurrentVideoUrl } from "@/course/domain/course"
import VidePlayerSidebar from "@/navigation/ui/video-player-sidebar"

export default async function ChapterPageRoute({ params }: any) {
  const { courseId, chapterId } = params

  const token = await queryToken()
  if (!token) return
  const course = await getCourse(token, atob(courseId))
  if (!course || !course?.chapterData) return
  const url = getCurrentVideoUrl(course?.chapterData, atob(chapterId))?.videoUrl

  return (
    <div>
      <VidePlayerSidebar
        currentChapterId={courseId}
        chapterData={course?.chapterData}
        courseId={courseId}
      />
      <div style={{ marginLeft: "20%" }}>
        <CourseVideoPage
          chapterId={courseId}
          courseId={courseId}
          videoUrl={url}
        />
      </div>
    </div>
  )
}

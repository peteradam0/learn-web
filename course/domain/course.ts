import { queryToken } from "@/common/api/query/get-user-token"
import { queryCompleteChapter } from "@/course/api/query/query-course"

export const getVideLengthInMin = (videoId: string): string => {
  const v: any = document.getElementById(videoId)
  const videoLengthInSecounds = v?.duration.toFixed(2)

  if (videoLengthInSecounds) {
    return secondsToMinutesAndSeconds(videoLengthInSecounds)
  }
  return "00:00"
}

export const triggerCompleteChapter = async (
  courseId: string,
  chapterId: string
) => {
  const token = await queryToken()

  if (token) {
    await queryCompleteChapter(courseId, chapterId, token)
  }
}

export const getCurrentVideoUrl = (chapters: Chapter[], chapterId: string) =>
  chapters.find((chapter: any) => chapter.id === chapterId)

function secondsToMinutesAndSeconds(totalSeconds: number): string {
  var minutes = Math.floor(totalSeconds / 60)
  var seconds = Math.floor(totalSeconds % 60)
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
}

export type Course = {
  id: string
  title: string
  description: string
  imageUrl: string
  category: string
  createdAt: string
  videoUrl: string
  chapterData: Chapter[]
}

export type Chapter = {
  title: string
  description: string
  videoUrl: string
  videoDuration: string
}

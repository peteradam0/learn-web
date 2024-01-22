import { getUserToken } from "@/course/domain/get-user-token";
import { completeChapter } from "../api-adapter/complete-course";

export const getVideLengthInMin = (videoId: string): string => {
  const v: any = document.getElementById(videoId);
  const videoLengthInSecounds = v?.duration.toFixed(2);

  if (videoLengthInSecounds) {
    return secondsToMinutesAndSeconds(videoLengthInSecounds);
  }
  return "00:00";
};

export const triggerCompleteChapter = async (
  courseId: string,
  chapterId: string
) => {
  const token = await getUserToken();

  if (token) {
    await completeChapter(courseId, chapterId, token);
  }
};

function secondsToMinutesAndSeconds(totalSeconds: number): string {
  var minutes = Math.floor(totalSeconds / 60);
  var seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

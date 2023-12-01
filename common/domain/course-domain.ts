import { completeChapter } from "../api-adapter/complete-course";

export const getVideLengthInMin = (videoId: string): string => {
  const v = document.getElementById(videoId);
  const videoLengthInSecounds = v?.duration.toFixed(2);

  if (videoLengthInSecounds) {
    return secondsToMinutesAndSeconds(videoLengthInSecounds);
  }
  return "00:00";
};

export const triggerCompleteChapter = (
  courseId: string,
  chapterId: string,
  token: string
) => {
  setTimeout(() => {
    const video = document.getElementById(chapterId);
    video?.addEventListener("ended", async (event) => {
      await completeChapter(courseId, chapterId, token);
    });
  }, 5000);
};

function secondsToMinutesAndSeconds(totalSeconds: number): string {
  var minutes = Math.floor(totalSeconds / 60);
  var seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

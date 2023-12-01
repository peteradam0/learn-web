"use client";
import React, { useEffect, useState } from "react";

import "next-cloudinary/dist/cld-video-player.css";
import { triggerCompleteChapter } from "@/common/domain/course-domain";
import { getUserToken } from "../domain/get-user-token";

export default function CourseVideoPage({
  videoUrl,
  chapterId,
  courseId,
}: any) {
  const [token, setToken] = useState();

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const res = await getUserToken();
    setToken(res);
  };

  if (token) {
    triggerCompleteChapter(courseId, chapterId, token);
  }

  return (
    <div style={{ width: "100%", height: "827px", overflow: "hidden" }}>
      <video
        id={chapterId}
        style={{ width: "100%", height: "100%" }}
        src={videoUrl}
        controls
      />
    </div>
  );
}

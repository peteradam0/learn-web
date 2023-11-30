"use client";
import React from "react";

import "next-cloudinary/dist/cld-video-player.css";

export default function CourseVideoPage({ videoUrl }: any) {
  return (
    <div style={{ width: "100%", height: "827px", overflow: "hidden" }}>
      <video
        style={{ width: "100%", height: "100%" }}
        src={videoUrl}
        controls
      />
    </div>
  );
}

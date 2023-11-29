"use client";
import { CldVideoPlayer } from "next-cloudinary";
import React from "react";

import "next-cloudinary/dist/cld-video-player.css";

export default function CourseVideoPage() {
  return (
    <div>
      <CldVideoPlayer
        width="100%"
        height="100%"
        src="https://utfs.io/f/0733690f-9290-4e92-882f-7bcf7c7561bc-11my46.mp4"
      />
    </div>
  );
}

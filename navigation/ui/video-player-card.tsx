"use client"
import { getVideLengthInMin } from "@/course/domain/course"
import Link from "next/link"
import React, { useEffect, useState } from "react"

export default function VideoPlayerCard({ chapter, courseId, done }: any) {
  const [videoMin, setVideoMin] = useState("")
  const url = `/courses/${courseId}/chapter/${chapter.id}`

  useEffect(() => {
    setTimeout(() => {
      const time = getVideLengthInMin(chapter.id)
      setVideoMin(time === "NaN:NaN" ? "00:00" : time)
    }, 4000)
  }, [])

  return (
    <Link className="max-w-[300px] w-full flex items-center gap-3" href={url}>
      <div>
        <video
          id={chapter.id}
          width={120}
          height={100}
          src={chapter.videoUrl}
          preload="auto"
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="h-6 w-3/5 rounded-lg">
          {done ? (
            <span style={{ color: "#A0A0A0" }}>{videoMin}</span>
          ) : (
            <span>{videoMin}</span>
          )}
        </div>
      </div>
    </Link>
  )
}

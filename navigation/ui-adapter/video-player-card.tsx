import Link from "next/link";
import React from "react";

export default function VideoPlayerCard({ chapter, courseId }: any) {
  const url = `/courses/${courseId}/chapter/${chapter.id}`;
  return (
    <Link className="max-w-[300px] w-full flex items-center gap-3" href={url}>
      <div>
        <video className="flex w-18 h-15" src={chapter.videoUrl} />
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="h-3 w-3/5 rounded-lg">{chapter.title}</div>
        <div className="h-3 w-4/5 rounded-lg">00:10-00:12</div>
      </div>
    </Link>
  );
}

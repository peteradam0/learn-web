"use clien";

import { Divider } from "@nextui-org/react";
import Link from "next/link";

export default function CourseSection(props: any) {
  const chapterData = props.data;
  const courseId = props.courseId;
  const url = `/courses/${btoa(courseId)}/chapter/${btoa(chapterData.id)}`;

  return (
    <div style={{ paddingTop: "2rem" }}>
      <Link href={url}>
        <h2 className="font-semibold text-white pb-1 pt-2 mt-2">
          {chapterData.title}
        </h2>
        <Divider className="bg-gray-600 my-4" />
        <div className="text-sm text-gray-600 flex items-center">
          <video
            id={chapterData.id}
            src={chapterData.videoUrl}
            style={{
              height: "170px",
              paddingTop: "15px",
              width: "200px",
            }}
            disablePictureInPicture
          />
          <div className="text-gray-900 font-bold text-l mb-2 ml-2 p-1 pl-2">
            <div className="flex items-center gap-4 pt-2">
              <div className="font-small text-gray-500">
                <p>{chapterData.description}</p>
              </div>
            </div>
            <p className="pt-2">{chapterData.videoDuration}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

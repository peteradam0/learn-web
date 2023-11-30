"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";

import React from "react";
import VideoPlayerCard from "./video-player-card";

export default function VidePlayerSidebar({ chapterData, courseId }: any) {
  return (
    <div>
      <aside
        className="text-white w-64 sidebarheight p-1 float-left bg-slate-50"
        style={{ backgroundColor: "#14151f" }}
      >
        <nav>
          <ul className="space-y-2">
            <li className="opcion-con-desplegable">
              <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                <div className="flex items-center">
                  <span>Lessons</span>
                </div>
              </div>
              <Accordion>
                {chapterData?.map((chapter: any) => (
                  <AccordionItem
                    key={chapter.id}
                    aria-label={chapter.title}
                    title={chapter.title}
                  >
                    <VideoPlayerCard chapter={chapter} courseId={courseId} />
                  </AccordionItem>
                ))}
              </Accordion>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}

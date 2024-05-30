"use client"

import { Accordion, AccordionItem } from "@nextui-org/react"

import VideoPlayerCard from "./video-player-card"
import { getCourseParticipation } from "@/course/api/get-course-participation"

export default function VidePlayerSidebar({
  chapterData,
  courseId,
  currentChapterId
}: any) {
  const participationData: any = getCourseParticipation(courseId)
  return (
    <div>
      <aside
        className="text-white sidebarheight p-1 float-left bg-slate-50"
        style={{ backgroundColor: "#14151f", width: "20%" }}
      >
        <nav>
          <ul className="space-y-2">
            <li className="opcion-con-desplegable">
              <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                <div className="flex items-center">
                  <span className="text-xl">Lessons</span>
                </div>
              </div>
              <Accordion defaultExpandedKeys={[currentChapterId]}>
                {chapterData?.map((chapter: any) =>
                  participationData.completedChapterIds?.includes(
                    chapter.id
                  ) ? (
                    <AccordionItem
                      data-disabled={() => {}}
                      key={chapter.id}
                      aria-label={chapter.title}
                      title={chapter.title + " " + "☑️"}
                    >
                      <VideoPlayerCard
                        chapter={chapter}
                        courseId={courseId}
                        done={true}
                      />
                    </AccordionItem>
                  ) : (
                    <AccordionItem
                      key={chapter.id}
                      aria-label={chapter.title}
                      title={chapter.title}
                    >
                      <VideoPlayerCard
                        chapter={chapter}
                        courseId={courseId}
                      />
                    </AccordionItem>
                  )
                )}
              </Accordion>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  )
}

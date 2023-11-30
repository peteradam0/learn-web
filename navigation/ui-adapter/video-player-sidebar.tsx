"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";

import React from "react";

export default function VidePlayerSidebar() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

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
                <AccordionItem
                  key="1"
                  aria-label="Accordion 1"
                  subtitle="Press to expand"
                  title="Accordion 1"
                >
                  {defaultContent}
                </AccordionItem>
                <AccordionItem
                  key="2"
                  aria-label="Accordion 2"
                  subtitle={
                    <span>
                      Press to expand <strong>key 2</strong>
                    </span>
                  }
                  title="Accordion 2"
                >
                  {defaultContent}
                </AccordionItem>
                <AccordionItem
                  key="3"
                  aria-label="Accordion 3"
                  subtitle="Press to expand"
                  title="Accordion 3"
                >
                  {defaultContent}
                </AccordionItem>
              </Accordion>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}

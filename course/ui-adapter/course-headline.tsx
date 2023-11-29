import React from "react";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Avatar, Chip } from "@nextui-org/react";

export default function CourseHeadline() {
  return (
    <div className="mb-8" style={{ marginLeft: "80px" }}>
      <h2 className="font-semibold text-xl text-gray-600 pb-1">
        Frontend & Fullstack Engineering Courses
      </h2>
      <div className="text-sm text-gray-600 flex items-center">
        <img
          src="http://placehold.it/360x150"
          alt="waves"
          style={{
            height: "170px",
            paddingTop: "15px",
            width: "200px",
          }}
        />
        <div className="text-gray-900 font-bold text-xl mb-2 ml-2 p-1">
          <div>
            <Chip
              startContent={<Icon icon="heroicons-outline:star" />}
              variant="faded"
              color="success"
            >
              Star 10
            </Chip>
          </div>
          <div className="pt-1 pb-2">
            <div
              style={{
                paddingTop: "10px",
              }}
              className="pt-1"
            >
              <span className="text-sm">Topics:</span>
              <span className="inline-block bg-gray-200 rounded-full px-1 py-1 text-sm font-semibold text-gray-700 mr-1 mb-1">
                #photography
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-1 py-1 text-sm font-semibold text-gray-700 mr-1 mb-1">
                #travel
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-1 py-1 text-sm font-semibold text-gray-700 mr-1 mb-1">
                #winter
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 pt-2">
            <Avatar
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              size="md"
            />
            <div className="font-medium text-gray-500">
              <div>John Doe</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Snowflake
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

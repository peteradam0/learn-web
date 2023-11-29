import React from "react";
import CourseTableOfContents from "./course-table-of-contents";

export default function CourseContent() {
  return (
    <div style={{ backgroundColor: "black", marginLeft: "105px" }}>
      <div className="text-sm text-gray-600 flex items-center">
        <img
          src="http://placehold.it/360x150"
          alt="waves"
          style={{
            height: "350px",
            paddingTop: "15px",
            width: "600px",
          }}
        />
        <div className="text-white  text-xl mb-2 ml-2 p-1">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur
          </p>
          <div className="pt-1 pb-2">
            <div
              style={{
                paddingTop: "10px",
              }}
              className="pt-1"
            >
              <span className="text-sm">Published:</span>
              <span className="inline-block bg-gray-200 rounded-full px-1 py-1 text-sm font-semibold text-gray-700 mr-1 mb-1">
                2023.29.11
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          paddingTop: "25px",
        }}
      >
        <CourseTableOfContents />
      </div>
    </div>
  );
}

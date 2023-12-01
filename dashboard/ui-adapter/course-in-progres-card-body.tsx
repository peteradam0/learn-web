import { CardBody, Divider, Link, Progress } from "@nextui-org/react";
import React from "react";

export default function CourseInProgressCardBody() {
  return (
    <>
      <CardBody>
        <Link href="">
          <div className="text-sm text-gray-600 flex items-center">
            <div className="text-gray-900 font-bold mb-1 ml-1 p-1">
              <div className="flex items-center gap-4 pt-1">
                <img src="" style={{ height: "50px", width: "100px" }} />
                <div className="font-medium text-gray-500">
                  <div className="text-sm"></div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    John Doe
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
        <div
          style={{
            paddingTop: "10px",
            paddingRight: "10px",
            paddingLeft: "6px",
            paddingBottom: "10px",
          }}
        >
          <Progress size="sm" aria-label="Loading..." value={60} />
        </div>
      </CardBody>
      <Divider />
    </>
  );
}

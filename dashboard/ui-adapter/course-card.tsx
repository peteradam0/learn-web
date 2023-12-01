import { CardBody, Divider } from "@nextui-org/react";
import React from "react";

export default function CourseCard() {
  return (
    <>
      <CardBody>
        <div className="text-sm text-gray-600 flex items-center">
          <div className="text-gray-900 font-bold mb-1 ml-1 p-1">
            <div className="flex items-center gap-4 pt-1">
              <img
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                style={{ height: "50px", width: "100px" }}
              />
              <div className="font-medium text-gray-500">
                <div className="text-sm">Learn Next 13</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  John Doe
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
      <Divider />
    </>
  );
}

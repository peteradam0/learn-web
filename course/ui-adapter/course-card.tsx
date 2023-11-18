import { Avatar, Button, Card } from "@nextui-org/react";
import React from "react";

export default function CourseCard({ course }: any) {
  return (
    <Card className="bg-red-300">
      <div className="relative flex flex-col min-w-0 break-wordsshadow-soft-xl rounded-2xl bg-clip-border ">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap -mx-3">
            <div className="max-w-full px-3 lg:w-1/2 lg:flex-none ">
              <div className="flex flex-col h-full bg-black">
                <p className="pt-2 mb-1 font-semibold text-gray-600">
                  {course.title}
                </p>
                <h5 className="font-bold text-gray-600">{course.category}</h5>

                <div style={{ paddingTop: "10px" }}>
                  <Avatar
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    size="md"
                  />
                  <p
                    style={{ paddingTop: "10px" }}
                    className="mb-12 text-gray-600"
                  >
                    {course.description}
                  </p>
                  <a className="" href="javascript:;"></a>
                  <Button
                    color="primary"
                    variant="faded"
                    className="mt-auto mb-0 font-semibold leading-normal text-sm group text-slate-500"
                  >
                    Faded
                  </Button>
                </div>
              </div>
            </div>
            <div className="max-w-full px-3 mt-12 ml-auto text-center lg:mt-0 lg:w-5/12 lg:flex-none">
              <img
                src={course.imageUrl}
                alt="waves"
                style={{ height: "130px", paddingTop: "30px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import React from "react";

export default function CourseCard({ course }: any) {
  return (
    <div className="shadow-lg">
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">{course.categoty}</p>
          <small className="text-default-500">{course.description}</small>
          <h4 className="font-bold text-large">{course.title}</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={course.imageUrl}
          />
        </CardBody>
      </Card>
    </div>
  );
}

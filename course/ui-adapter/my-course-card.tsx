/* eslint-disable @next/next/no-img-element */
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import React from "react";

export default function MyCourseCard({ course }: any) {
  return (
    <div className="shadow-lg">
      <Card className="py-4 pb-1" style={{ height: "300px" }}>
        <CardHeader
          className="pb-0 pt-2 px-4 flex-col items-start"
          style={{ height: "70px" }}
        >
          <p className="text-tiny uppercase font-bold">{course.category}</p>
          <small className="text-default-500">{course.description}</small>
          <h4 className="font-bold text-large">{course.title}</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <img
            alt="Card background"
            width={500}
            style={{ height: "190px" }}
            className="object-cover rounded-xl"
            src={course.imageUrl}
          />
        </CardBody>
      </Card>
    </div>
  );
}

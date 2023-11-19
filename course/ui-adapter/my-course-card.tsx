/* eslint-disable @next/next/no-img-element */
import { Card, CardBody, CardHeader, Chip, Image } from "@nextui-org/react";
import React from "react";

export default function MyCourseCard({ course }: any) {
  return (
    <div className="shadow-lg">
      <Card className="py-4 pb-1" style={{ height: "300px" }}>
        <CardHeader
          className="pb-0 px-4 flex-col items-start"
          style={{ height: "60px" }}
        >
          <h4 className="font-bold text-large">{course.title}</h4>
          <small className="text-default-500">{course.description}</small>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <img
            alt="Card background"
            width={500}
            style={{ height: "170px" }}
            className="object-cover rounded-xl"
            src={course.imageUrl}
          />
          <div style={{ paddingTop: "10px" }}>
            {course.published && <Chip color="success">Published</Chip>}
            {!course.published && <Chip color="warning">Unpublished</Chip>}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import React from "react";

export default function CourseCard() {
  return (
    <div className="shadow-lg">
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">Daily Mix</p>
          <small className="text-default-500">12 Tracks</small>
          <h4 className="font-bold text-large">Frontend Radio</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src="https://mobisoftinfotech.com/resources/wp-content/uploads/2022/04/next-JS-framework.png"
          />
        </CardBody>
      </Card>
    </div>
  );
}

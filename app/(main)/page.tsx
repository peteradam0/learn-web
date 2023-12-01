"use client";
import CoursesInProgressCard from "@/dashboard/ui-adapter/courses-in-progress-card";
import NewCoursesCard from "@/dashboard/ui-adapter/new-courses-card";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Link,
} from "@nextui-org/react";
import React from "react";

export default function WelcomePage() {
  return (
    <div
      style={{ marginLeft: "255px", marginRight: "255px", paddingTop: "30px" }}
    >
      <h1 className="text-xl pb-7">Welcome Back, peteradam </h1>
      <Divider />
      <div className="pt-5">
        <div className="grid grid-cols-2" style={{ gap: "70px" }}>
          <div>
            <h1>Courses in progress</h1>
            <div className="pt-5">
              <CoursesInProgressCard />
            </div>
          </div>
          <div>
            <h1>Explore courses</h1>
            <div className="pt-5">
              <NewCoursesCard />
            </div>
          </div>
          <div className="pt-5">
            <h1>Upcomming courses</h1>
            <div className="pt-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

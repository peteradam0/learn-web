"use client";
import { getUserData } from "@/common/api-adapter/get-user-data";
import CoursesInProgressCard from "@/dashboard/ui-adapter/courses-in-progress-card";
import NewCoursesCard from "@/dashboard/ui-adapter/new-courses-card";

import { Divider } from "@nextui-org/react";

import React, { useEffect, useState } from "react";
import ActiveEventsCard from "@/event/ui-adapter/active-events-card";

export default function WelcomePage() {
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await getUserData();
      setUserData(res?.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div
      style={{ marginLeft: "255px", marginRight: "255px", paddingTop: "30px" }}
    >
      <h1 className="text-xl pb-7">Welcome Back, {userData?.username} </h1>
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
          <div>
            <h1>Active events</h1>
            <div className="pt-5">
              <ActiveEventsCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

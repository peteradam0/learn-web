"use client";
import { getUserData } from "@/common/api-adapter/get-user-data";
import { getUserToken } from "@/course/domain/get-user-token";
import CoursesInProgressCard from "@/dashboard/ui-adapter/courses-in-progress-card";
import NewCoursesCard from "@/dashboard/ui-adapter/new-courses-card";

import { Divider } from "@nextui-org/react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function WelcomePage() {
  const [userData, setUserData] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const token = await getUserToken();

    if (!token) {
      redirect("/");
    }

    try {
      const res = await getUserData(token);
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
          <div className="pt-5">
            <h1>Upcomming courses</h1>
            <div className="pt-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

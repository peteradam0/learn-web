import AddCoursePage from "@/addcourse/ui-adapter/addcourse-page";
import React from "react";
import { getUserToken } from "@/course/domain/get-user-token";
import { redirect } from "next/navigation";

export default async function AddCoursePageRoute() {
  const token = await getUserToken();

  if (token === null) {
    redirect("/");
  }

  return (
    <div>
      <AddCoursePage token={token} />
    </div>
  );
}

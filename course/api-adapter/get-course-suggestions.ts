//canvas.docker/api/v1/courses

import { redirect } from "next/navigation";
import { getUserToken } from "../domain/get-user-token";
import qs from "query-string";
import axios from "axios";

export const getCourseSuggestions = async (canvasToken: string) => {
  const token = await getUserToken();
  if (!token) {
    redirect("/");
  }

  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/suggestion`,
  });
  let res = undefined;
  try {
    res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        csrf_token: `Bearer ${canvasToken}`,
      },
    });
  } catch (e) {
    console.log(e);
  }
  return res;
};

//canvas.docker/api/v1/courses

import { redirect } from "next/navigation";
import { queryToken } from "../../../common/api/query/get-user-token";
import qs from "query-string";
import axios from "axios";
import { getCanvasDomain } from "@/technical/canvaslms";

export const queryUserSuggestions = async (canvasToken: string) => {
  const token = await queryToken();
  if (!token) {
    redirect("/");
  }

  const canvasDomain = getCanvasDomain();
  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/create/suggestions`,
  });
  let res = undefined;
  try {
    res = await axios.post(url, {canvasDomain: canvasDomain},{
      headers: {
        Authorization: `Bearer ${token}`,
        csrf_token: `Bearer ${canvasToken}`
      },
    });
  } catch (e) {
    console.log(e);
  }
  return res;
};

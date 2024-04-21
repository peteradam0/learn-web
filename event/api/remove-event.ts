import { queryToken } from "@/common/api/query/get-user-token";
import axios from "axios";
import { redirect } from "next/navigation";
import qs from "query-string";

export const removeVideoEvent = async ({ videoData }: any) => {
  const token = await queryToken();
  if (!token) {
    redirect("/");
  }

  const { name, organization } = videoData;
  console.log(videoData);
  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/delete`,
  });
  let res = undefined;

  try {
    res = await axios.post(
      url,
      { name, organization },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {
    console.log(e);
  }
  return res;
};

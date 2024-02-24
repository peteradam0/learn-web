import { getUserToken } from "@/course/domain/get-user-token";
import axios from "axios";
import { redirect } from "next/navigation";
import qs from "query-string";

export const createVideoEvent = async ({ videoData }: any) => {
  const token = await getUserToken();
  if (!token) {
    redirect("/");
  }

  const { name, description, imageUrl, organization, users } = videoData;

  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/events`,
  });
  let res = undefined;

  try {
    res = await axios.post(
      url,
      { name, description, imageUrl, organization, users },
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

export const startVideoEvent = async ({ videoData }: any) => {
  const token = await getUserToken();
  if (!token) {
    redirect("/");
  }

  const { name, organization, roomId } = videoData;

  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/start`,
  });
  let res = undefined;

  try {
    res = await axios.post(
      url,
      { name, organization, roomId },
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

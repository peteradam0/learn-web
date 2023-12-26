import { getUserToken } from "@/course/domain/get-user-token";
import axios from "axios";
import { redirect } from "next/navigation";
import qs from "query-string";

export const getOrganizationMemberSuggestions = async (
  organizationName: string,
  canvasToken: string
) => {
  const token = await getUserToken();
  if (!token) {
    redirect("/");
  }

  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/organization/${organizationName}/members/suggestions`,
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

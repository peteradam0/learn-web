import { getUserToken } from "@/course/domain/get-user-token";
import axios from "axios";
import { redirect } from "next/navigation";
import qs from "query-string";

export const deleteOrganization = async ({ name }: any) => {
  const token = await getUserToken();
  if (!token) {
    redirect("/");
  }

  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/organizations/${name}`,
  });
  let res = undefined;
  try {
    res = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    console.log(e);
  }
  return res;
};

import { getUserToken } from "@/course/domain/get-user-token";
import axios from "axios";
import { redirect } from "next/navigation";
import qs from "query-string";

export const createOrganization = async ({ email, organizationName }: any) => {
  const token = await getUserToken();
  if (!token) {
    redirect("/");
  }

  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/organizations/invite`,
  });
  let res = undefined;
  try {
    res = await axios.post(
      url,
      { userEmail: email, organizationName },
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

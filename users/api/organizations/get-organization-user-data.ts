import { queryToken } from "@/common/api/query/get-user-token";
import axios from "axios";
import { redirect } from "next/navigation";
import qs from "query-string";

export const getOrganizationMemberData = async ({ email, organizationName }: any) => {
  const token = await queryToken();
  if (!token) {
    redirect("/");
  }

  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/organizations/members`,
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

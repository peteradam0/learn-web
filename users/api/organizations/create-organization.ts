import { queryToken } from "@/course/api/query/get-user-token";
import axios from "axios";
import { redirect } from "next/navigation";
import qs from "query-string";

export const createOrganization = async ({ name, imageUrl }: any) => {
  const token = await queryToken();
  if (!token) {
    redirect("/");
  }

  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/organizations`,
  });
  let res = undefined;
  try {
    res = await axios.post(
      url,
      { name, imageUrl },
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

export const sendOrganizationMemberInvite = async ({
  email,
  organizationName,
}: any) => {
  const token = await queryToken();
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

export const confirmInvite = async (invitationId: string) => {
  const token = await queryToken();
  if (!token) {
    redirect("/");
  }

  console.log(token);

  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/organizations/invite/${invitationId}/confirmation`,
  });
  let res = undefined;
  try {
    res = await axios.post(
      url,
      {},
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

export const getOrganizationMemberData = async (organizationName: string) => {
  const token = await queryToken();
  if (!token) {
    redirect("/");
  }

  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/organizations/${organizationName}/members`,
  });
  let res = undefined;
  try {
    res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    console.log(e);
  }
  return res;
};

import axios from "axios";
import qs from "query-string";
import { queryToken } from "../../common/api/query/get-user-token";
import { redirect } from "next/navigation";

export const updateChapter = async (courseId: string) => {
  const token = await queryToken();

  if (!token) {
    redirect("/");
  }
  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${courseId}`,
  });

  let res = undefined;
  try {
    res = await axios.put(
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

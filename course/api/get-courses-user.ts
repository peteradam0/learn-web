import axios from "axios";
import qs from "query-string";

export const getCoursesForUser = async (token: string) => {
  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/administration/courses`,
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

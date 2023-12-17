import axios from "axios";
import qs from "query-string";

export const getPublishedCourses = async (token: string) => {
  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/published`,
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

import axios from "axios";
import qs from "query-string";

export const createCourse = async ({ title }: { title: string }) => {
  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/course`,
  });

  let res = undefined;
  try {
    res = await axios.post(
      url,
      {
        title,
      },
      {
        headers: {
          Authorization: `Basic 123`,
        },
      }
    );
  } catch (e) {
    console.log(e);
  }
  return res;
};

import axios from "axios";
import qs from "query-string";

export const removeChapter = async (
  courseId: string,
  chapterId: string,
  token: string
) => {
  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${courseId}/chapters/${chapterId}`,
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

import { CreateChapterProps } from "@/common/domain/types";
import axios from "axios";
import qs from "query-string";

export const createChapter = async (
  createChapterData: CreateChapterProps,
  courseId: string,
  token: string
) => {
  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${courseId}/chapters`,
  });

  let res = undefined;
  try {
    res = await axios.post(url, createChapterData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    console.log(e);
  }
  return res;
};

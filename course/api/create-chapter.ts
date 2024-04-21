import axios from "axios"
import qs from "query-string"
import { queryToken } from "../../common/api/query/get-user-token"
import { redirect } from "next/navigation"
import { Chapter } from "@/course/domain/course"

export const createChapter = async (
  createChapterData: Chapter,
  courseId: string
) => {
  const token = await queryToken()

  if (!token) {
    redirect("/")
  }
  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${courseId}/chapters`
  })

  let res = undefined
  try {
    res = await axios.post(url, createChapterData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (e) {
    console.log(e)
  }
  return res
}

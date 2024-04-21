import axios from "axios"
import qs from "query-string"

export const updateCourse = async (createCourseData: any, token: string) => {
  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses`
  })

  let res = undefined
  try {
    res = await axios.put(url, createCourseData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (e) {
    console.log(e)
  }
  return res
}

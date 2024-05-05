import { queryToken } from "@/common/api/query/get-user-token"
import axios from "axios"
import { redirect } from "next/navigation"
import qs from "query-string"

export const queryCourseData = async (token: string, courseId: string) => {
  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${courseId}`
  })
  let res = undefined
  try {
    res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (e) {
    console.log(e)
  }
  return res
}
export const queryNotInProgressCourseData = async (token: string) => {
  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/not-in-progress`
  })
  let res = undefined
  try {
    res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (e) {
    console.log(e)
  }
  return res
}
export const queryInProgressCourseData = async (token: string) => {
  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/in-progress`
  })
  let res = undefined
  try {
    res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (e) {
    console.log(e)
  }
  return res
}
export const queryCourses = async (token: string) => {
  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses`
  })

  let res = undefined
  try {
    res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (e) {
    console.log(e)
  }
  return res
}
export const queryCreateCourses = async (
  createCourseData: any,
  token: string
) => {
  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses`
  })

  let res = undefined
  try {
    res = await axios.post(url, createCourseData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (e) {
    console.log(e)
  }
  return res
}

export const queryRemoveCourse = async (courseId: string) => {
  const token = await queryToken()

  if (!token) {
    redirect("/")
  }

  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${courseId}`
  })

  let res = undefined
  try {
    res = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (e) {
    console.log(e)
  }
  return res
}

export const querySelfCourses = async (token: string) => {
  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/self`
  })

  let res = undefined
  try {
    res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (e) {
    console.log(e)
  }

  return res
}
export const queryUpdateCourse = async (
  createCourseData: any,
  token: string
) => {
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

export const queryCoursesForUser = async (token: string) => {
  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/administration/courses`
  })

  let res = undefined
  try {
    res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (e) {
    console.log(e)
  }
  return res
}
export const queryUpdateChapter = async (courseId: string) => {
  const token = await queryToken()

  if (!token) {
    redirect("/")
  }
  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${courseId}`
  })

  let res = undefined
  try {
    res = await axios.put(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  } catch (e) {
    console.log(e)
  }
  return res
}

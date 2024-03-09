import { getUserToken } from "@/course/domain/get-user-token"
import axios from "axios"
import { redirect } from "next/navigation"
import qs from "query-string"

export const getVideoEvents = async () => {
  const token = await getUserToken()
  if (!token) {
    redirect("/")
  }

  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/events`
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

export const getActiveVideoEvents = async (token: string) => {
  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/active`
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

export const getUpcomingEvents = async (token: string) => {
  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/upcoming`
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

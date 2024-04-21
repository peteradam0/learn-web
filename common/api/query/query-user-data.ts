import { queryToken } from "@/common/api/query/get-user-token"
import axios from "axios"
import { redirect } from "next/navigation"
import qs from "query-string"

export const queryUserData = async () => {
  const token = await queryToken()
  if (!token) {
    redirect("/")
  }

  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user`
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

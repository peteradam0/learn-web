import { queryToken } from "@/course/api/query/get-user-token"
import axios from "axios"
import { redirect } from "next/navigation"
import qs from "query-string"

export const sendUserInvitation = async ({ email }: any) => {
  const token = await queryToken()
  if (!token) {
    redirect("/")
  }

  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/invitation`
  })
  let res = undefined
  try {
    res = await axios.post(
      url,
      { email },
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
